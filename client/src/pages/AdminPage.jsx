import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Trash2, XCircle, FileText, CheckSquare, Edit, ChevronLeft, ChevronRight, PlusIcon, Calendar, Loader } from 'lucide-react';
import { Link } from 'react-router';
import { _routes, axiosInstance, BASE_URL } from '@/axios/axios';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

// Utility function to format MongoDB nested date OR standard ISO string
const formatMongoDate = (dateField) => {
    let dateString;

    if (typeof dateField === 'object' && dateField !== null && dateField.$date) {
        dateString = dateField.$date;
    }
    else if (typeof dateField === 'string') {
        dateString = dateField;
    }
    else if (dateField instanceof Date) {
        dateString = dateField.toISOString();
    }

    if (!dateString) return 'N/A';

    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
        console.error("Error formatting date:", error);
        return 'Invalid Date';
    }
};

// Helper to determine the key to use for unique identification (_id is standard for MongoDB)
const getIdKey = (item) => item._id || item.id;

// API URL for display/error message
const API_ENDPOINT = BASE_URL + _routes.blogs.getAllBlogs_get;

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching Logic (Refactored to be callable for refresh) ---
    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(_routes.blogs.getAllBlogs_get);

            // 👇 Adjust this depending on your backend response
            const posts = Array.isArray(response.data)
                ? response.data
                : response.data.data || response.data.blogs || [];

            setData(posts);
            return posts;
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.response?.data?.message || err.message || 'An unknown error occurred while fetching data.');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);


    // Initial fetch on mount
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // --- Memoized, Filtered, and Paginated Data (UNCHANGED) ---
    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return data;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        return data.filter(item =>
            item.title.toLowerCase().includes(lowerCaseSearch) ||
            item.author?.toLowerCase().includes(lowerCaseSearch) ||
            item.status?.toLowerCase().includes(lowerCaseSearch) ||
            getIdKey(item).toString().includes(lowerCaseSearch)
        );
    }, [data, searchTerm]);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // --- Effects for Pagination and Selection (UNCHANGED) ---
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [data, searchTerm, totalPages]);

    useEffect(() => {
        const validSelected = new Set(Array.from(selectedIds).filter(id => data.some(item => getIdKey(item) === id)));
        if (validSelected.size !== selectedIds.size) {
            setSelectedIds(validSelected);
        }
    }, [data, selectedIds]);


    // --- Selection Handlers (UNCHANGED) ---
    const handleToggleSelect = useCallback((id) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);

    const handleToggleSelectAll = useCallback((checked) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (checked) {
                currentData.forEach(item => newSet.add(getIdKey(item)));
            } else {
                currentData.forEach(item => newSet.delete(getIdKey(item)));
            }
            return newSet;
        });
    }, [currentData]);

    const isAllSelected = currentData.length > 0 && currentData.every(item => selectedIds.has(getIdKey(item)));
    const selectedCount = selectedIds.size;

    // ------------------------------------------------------------------
    // --- UPDATED Action Handlers with AXIOS API Calls ---
    // ------------------------------------------------------------------

    const executeDelete = useCallback(async (idToDelete) => {
        try {
            await axiosInstance.delete(_routes.blogs.deleteBlog_delete(idToDelete));

            // On success, update the local state immediately (optimistic update)
            setData(prev => prev.filter(item => getIdKey(item) !== idToDelete));
            setSelectedIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(idToDelete);
                return newSet;
            });
            console.log(`Successfully deleted post ID: ${idToDelete}`);
            toast.success(`Successfully deleted post ID: ${idToDelete}`);

        } catch (err) {
            console.error("Deletion error:", err);
            alert(`Failed to delete post: ${err.response?.data?.message || err.message}`);
            // Re-fetch data on failure to ensure state consistency
            fetchPosts();
        }
    }, [fetchPosts]);

    const executeBulkDelete = useCallback(async () => {
        const idsToDelete = Array.from(selectedIds);
        if (idsToDelete.length === 0) return;

        try {
            // Your API should expect an array of IDs in the body for bulk-delete
            await axiosInstance.delete(_routes.blogs.bulkDeleteBlog_delete, {
                data: { ids: idsToDelete } // Axios uses the 'data' property for DELETE body
            });

            // On success, update the local state immediately
            setData(prev => prev.filter(item => !idsToDelete.includes(getIdKey(item))));
            setSelectedIds(new Set());
            console.log(`Successfully executed bulk deletion of ${idsToDelete.length} posts.`);

        } catch (err) {
            console.error("Bulk deletion error:", err);
            alert(`Failed to execute bulk delete: ${err.response?.data?.message || err.message}`);
            // Re-fetch data on failure to ensure state consistency
            fetchPosts();
        }
    }, [selectedIds, fetchPosts]);

    const handleEditClick = (item) => {
        console.log(`--- EDIT ACTION ---`);
        console.log(`Editing Post ID: ${getIdKey(item)}`);
        console.warn(`Simulating edit for post: "${item.title}". In a real app, this would route to an edit form.`);
    };


    // --- Modal Confirmation Logic (UNCHANGED) ---
    const handleDeleteClick = (item) => {
        const id = getIdKey(item);
        setActionToConfirm({
            message: `Are you sure you want to delete post ID ${id}? This action cannot be undone.`,
            handler: () => executeDelete(id),
        });
        setIsModalOpen(true);
    };

    const handleBulkDeleteClick = () => {
        if (selectedCount === 0) return;
        setActionToConfirm({
            message: `Are you sure you want to delete ${selectedCount} selected post(s)? This action cannot be undone.`,
            handler: executeBulkDelete,
        });
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        if (actionToConfirm && actionToConfirm.handler) {
            // The handler (executeDelete or executeBulkDelete) is now async
            actionToConfirm.handler();
        }
        setIsModalOpen(false);
        setActionToConfirm(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActionToConfirm(null);
    };

    // --- Helper Components (Modal, TableRow, PaginationControls - UNCHANGED) ---

    const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-neutral-900/90 bg-opacity-75 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-red-600 flex items-center">
                            <XCircle className="w-6 h-6 mr-2" />
                            Confirm Deletion
                        </h3>
                        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-700 mb-6">{message}</p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-500/50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const TableRow = React.memo(({ item, isSelected, onToggleSelect, onDelete, onEdit }) => {
        const id = getIdKey(item);

        return (
            <tr
                key={id}
                className={`border-b transition-all duration-150 ${isSelected ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' : 'bg-white hover:bg-gray-50'
                    }`}
            >
                <td className="p-3 w-10 text-center">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(id)}
                        className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                </td>
                <td className="p-3 font-mono text-gray-500 text-sm w-16 truncate max-w-[4rem]">{id}</td>
                <td className="p-3 font-medium text-gray-900 truncate max-w-xs">{item.title}</td>
                <td className="p-3 text-sm text-gray-500 hidden sm:table-cell">
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span>{formatMongoDate(item.createdAt)}</span>
                    </div>
                </td>
                <td className="p-3 text-right flex justify-end space-x-1 w-32">
                    <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-full text-indigo-500 hover:bg-indigo-100 transition duration-150"
                        aria-label={`Edit post ${item.title}`}
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded-full text-red-500 hover:bg-red-100 transition duration-150"
                        aria-label={`Delete post ${item.title}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </td>
            </tr>
        );
    });

    const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
        if (totalPages <= 1) return null;

        const pageNumbers = useMemo(() => {
            const pages = [];
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);

            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        }, [currentPage, totalPages]);

        const PageButton = ({ number, isActive }) => (
            <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                    }`}
            >
                {number}
            </button>
        );

        return (
            <nav className="flex items-center space-x-2 mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {pageNumbers.map(number => (
                    <PageButton key={number} number={number} isActive={number === currentPage} />
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Next Page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </nav>
        );
    };


    return (
        <div className="p-4 md:p-8 min-h-screen mt-30 bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
                <header className="mb-8 flex flex-col sm:flex-row justify-between  ">
                    <div className=''>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center mb-2">
                            <FileText className="w-8 h-8 mr-3 text-indigo-600" />
                            Post Administration
                        </h1>
                        <p className="text-gray-500">Manage and moderate all content posts from **`{BASE_URL}`**.</p>
                    </div>
                    <Link to={'/add-blog'}><span className='flex bg-black text-white py-4 px-5 my-5 rounded-full'><PlusIcon className='size-6 pr-2' />{" "}Add new Blog</span></Link>
                </header>

                {/* Top Control Bar: Search and Bulk Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search posts by title, author, status, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        onClick={handleBulkDeleteClick}
                        disabled={selectedCount === 0 || isLoading}
                        className={`flex items-center px-4 py-3 rounded-xl font-semibold transition duration-200 w-full sm:w-auto text-center justify-center
             ${selectedCount > 0 && !isLoading
                                ? 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/50'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }
            `}
                    >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Bulk Delete ({selectedCount})
                    </button>
                </div>

                {/* --- Data Display/Loading/Error Area --- */}
                {isLoading ? (
                    <div className="flex justify-center items-center p-12 text-indigo-600">
                        <Loader className="w-8 h-8 animate-spin mr-3" />
                        <span className="text-xl font-medium">Loading posts from API...</span>
                    </div>
                ) : error ? (
                    <div className="text-center p-12 bg-red-50 border-2 border-red-300 rounded-xl">
                        <XCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-red-800">Error Fetching Data</h2>
                        <p className="text-red-700 mt-2">**Error:** {error}</p>
                        <p className="text-red-700 mt-2 text-sm">Attempted to fetch from: `{API_ENDPOINT}`. Check your server status and console for network details.</p>
                    </div>
                ) : (
                    <>
                        {/* Table Container */}
                        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="p-3 w-10 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={(e) => handleToggleSelectAll(e.target.checked)}
                                                className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                                title="Select All on Current Page"
                                            />
                                        </th>
                                        <th scope="col" className="p-3 text-left text-xs font-semibold text-gray-600 uppercase w-20">ID</th>
                                        <th scope="col" className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                                        <th scope="col" className="p-3 text-left text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">Created At</th>
                                        <th scope="col" className="p-3 text-right text-xs font-semibold text-gray-600 uppercase w-32">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {currentData.length > 0 ? (
                                        currentData.map(item => (
                                            <TableRow
                                                key={getIdKey(item)}
                                                item={item}
                                                isSelected={selectedIds.has(getIdKey(item))}
                                                onToggleSelect={handleToggleSelect}
                                                onDelete={handleDeleteClick}
                                                onEdit={handleEditClick}
                                            />
                                        ))
                                    ) : (
                                        <tr className="bg-white">
                                            <td colSpan="5" className="p-6 text-center text-gray-500 text-lg">
                                                No posts found matching "{searchTerm}".
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer showing item count and pagination controls */}
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-sm text-gray-500">
                                <span>
                                    Showing {Math.min(totalItems, indexOfFirstItem + 1)}–{Math.min(totalItems, indexOfLastItem)} of {totalItems} total posts.
                                </span>
                                {selectedCount > 0 && (
                                    <span className="font-semibold text-indigo-600 flex items-center mt-1 md:mt-0">
                                        <CheckSquare className="w-4 h-4 mr-1 ml-4" />
                                        {selectedCount} selected globally
                                    </span>
                                )}
                            </div>

                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                message={actionToConfirm?.message}
                onConfirm={confirmAction}
                onCancel={closeModal}
            />
        </div>
    );
};

export default AdminPage;