import React from "react";

const Video = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80%] lg:h-screen bg-black">
      <div className="w-full max-w-7xl px-5">
        {/* Responsive iframe container */}
        <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/nV_hd6bLXmw?si=okDnDtSQclE2R0iu"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Video;
