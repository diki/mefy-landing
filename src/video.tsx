import { useState } from "react";
import { XCircle } from "lucide-react";
import MediaThemeSutro from "player.style/sutro/react";

const VideoShowcase = () => {
  const [showFullDemo, setShowFullDemo] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Preview Video Container */}
      <div className="relative rounded-lg overflow-hidden bg-gray-900 shadow-xl border border-black ">
        <video className="w-full h-auto" muted loop playsInline>
          <source
            src="https://pub-44a7879b26f64627bfc4e8d20dfa8a95.r2.dev/landing2.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Indicators */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-between">
            {/* <div className="text-white text-sm">Preview: 0:30</div> */}
            {/* <button
              onClick={() => setShowFullDemo(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full transition-colors"
            >
              <Play size={16} />
              Watch full demo
            </button> */}
          </div>
        </div>
      </div>

      {/* Feature Indicators */}
      {/* <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div className="p-3 rounded-lg bg-gray-800 text-white">
          <p className="text-sm">Dashboard Overview</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-800 text-white">
          <p className="text-sm">AI Generation Demo</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-800 text-white">
          <p className="text-sm">Content Customization</p>
        </div>
      </div> */}

      {/* Full Demo Modal */}
      {showFullDemo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-[90vw] h-[80vh]">
            {" "}
            {/* Adjusted container size */}
            <button
              onClick={() => setShowFullDemo(false)}
              className="absolute -top-12 right-0 text-white hover:text-yellow-400 z-50"
            >
              <XCircle className="" />
            </button>
            {/* MediaThemeSutro container */}
            <div className="w-full h-full flex items-center justify-center">
              <MediaThemeSutro className="w-full h-full">
                <video
                  slot="media"
                  src="https://pub-44a7879b26f64627bfc4e8d20dfa8a95.r2.dev/project-demo-final.mov"
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                  autoPlay={false}
                ></video>
              </MediaThemeSutro>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoShowcase;
