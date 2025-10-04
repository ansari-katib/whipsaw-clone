import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import { Toaster } from 'react-hot-toast';
import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage';
import Contact from './pages/Contact';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import Careers from './pages/Careers';
import About from './pages/About';
import LatestPage from './pages/LatestPage';
import AdminPage from './pages/AdminPage';
import AddBlog from './pages/AddBlog';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {/*  Page routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/contact' element={<Contact />} />
          {/* <Route path='/expertise' element={<Expertise />} /> */}
          <Route path='/work' element={<Work />} />
          <Route path='/latest' element={<LatestPage />} />
          {/* <Route path='/careers' element={<Careers />} /> */}
          <Route path='/about' element={<About />} />
                    
          {/* Admin Route */}
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/add-blog' element={<AddBlog />} />


          {/* page not found page */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

      {/*  toast for notification */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>
  )
}

export default App
