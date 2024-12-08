import "./App.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Canvas from "./lorenz2";
import Features from "./Features";
import Video from "./video";

const App = () => {
  const controls = useAnimation();
  const textRef = useRef(null);
  const [bgColor, setBgColor] = useState("rgb(0, 0, 0)");
  const [textColor, setTextColor] = useState("rgb(255, 255, 255)"); // Add this line

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;

      const hero3Element = document.getElementById("hero3");
      if (!hero3Element) return;

      const hero3Rect = hero3Element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const hero3VisiblePortion = windowHeight - hero3Rect.top;
      const hero3Height = hero3Element.offsetHeight;

      // Calculate progress through hero3
      const hero3ScrollProgress = hero3VisiblePortion / hero3Height;

      // When near end of hero3 (last 20%), transition to white
      if (hero3ScrollProgress > 0.8) {
        setBgColor("rgb(231, 229, 228)");
        setTextColor("rgb(30, 30, 30)");
      } else {
        const colorValue = Math.floor(hero3ScrollProgress * 255);
        const textColorValue = 255 - colorValue; // Inverse of background color
        setBgColor(`rgb(${colorValue}, ${colorValue}, ${colorValue})`);
        setTextColor(
          `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`
        );
      }

      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      const visiblePortion = windowHeight - rect.top;
      const progress = Math.min(
        Math.max(visiblePortion / (windowHeight * 0.5), 0),
        1
      );
      const text =
        "Build powerful AI workflows that drive organic growth by combining top models, brand assets, and ready-to-use integrations";
      const words = text.split(" ");
      const wordCount = words.length;
      const activeWords = Math.floor(progress * wordCount);

      words.forEach((_, index) => {
        controls.start((i) => ({
          color: i < activeWords ? "#ffffff" : "#333",
          transition: { duration: 0.1 },
        }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const text =
    "Build powerful AI workflows that drive organic growth by combining top models, brand assets, and ready-to-use integrations";
  const words = text.split(" ");

  return (
    <main className="min-h-screen">
      <section className="flex w-full">
        <div id="container" className="flex flex-col w-full">
          <div className="fixed top-0 left-0 w-full flex justify-center">
            <Canvas />
          </div>
          <div
            style={{
              backgroundColor: bgColor,
              transition: "background-color 0.3s ease-out",
            }}
          >
            <div
              className="flex flex-col items-center w-full relative h-screen"
              id="hero"
            >
              <div className="text-white max-w-2xl flex flex-col items-center gap-6 mt-36 z-10">
                <h1
                  className="font-display font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem] text-9xl"
                  style={{
                    fontFamily: '"Open Sans", serif',
                  }}
                >
                  JotOps
                </h1>
                <div
                  className="text-3xl text-white tracking-normal leading-10 text-center max-w-xl font-light mt-8"
                  style={{ fontFamily: '"Merriweather", serif' }}
                >
                  Bring your boldest content growth strategies to life
                </div>
                <div className="flex gap-4 z-10">
                  <button className="border-2 border-white text-white rounded-lg bg-neutral-900 transition duration-300 py-1 text-xs px-4 font-bold">
                    Learn more
                  </button>
                  <button className="border text-black rounded-lg shadow-lg bg-white transition duration-300 py-2 text-xs px-4 font-bold">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-center w-full relative min-h-screen"
              id="hero"
            >
              <div className="text-white w-full flex flex-col items-center gap-6 mt-36 z-10 px-4">
                <div
                  ref={textRef}
                  className="text-5xl text-center w-full max-w-2xl font-semibold"
                  style={{ wordWrap: "break-word", lineHeight: "1.25" }}
                >
                  <div className="flex flex-wrap justify-center">
                    {words.map((word, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        animate={controls}
                        initial={{ color: "#9CA3AF" }}
                        className="px-1.5 py-0.5"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-center w-full relative min-h-screen text-white"
              id="hero3"
            >
              <div className="max-w-xl flex flex-col items-center gap-6 z-10">
                <div
                  className="text-6xl tracking-normal leading-10 text-center max-w-xl mt-8"
                  style={{
                    // fontFamily: '"Merriweather", serif',
                    color: textColor,
                    transition: "color 0.3s ease-out",
                    lineHeight: "1.1",
                  }}
                >
                  AI agents that can write like you...
                </div>
              </div>
              <Features />
              {/* <div className="h-[70vh] w-[30vw] bg-white mt-12 rounded-md border border-gray-300">
                s
              </div> */}
            </div>
            <div
              className="flex flex-col items-center w-full relative min-h-screen text-white pt-32"
              id="hero4"
            >
              <div className="w-10/12 mx-auto bg-white rounded-md border border-gray-300 flex flex-row p-12">
                <div className="w-1/2 flex flex-col justify-center text-neutral-600 gap-4">
                  <div className="text-xs flex items-center gap-2 tracking-widest">
                    <span className="h-2 w-2 bg-orange-600"></span>
                    <span>VIDEO OVERVIEW</span>
                  </div>
                  <div
                    className="text-5xl font-thin"
                    style={{
                      fontFamily: '"Roboto Serif", serif',
                      lineHeight: "1.25",
                    }}
                  >
                    Learn how JotOps
                    <br /> works in 60 seconds
                  </div>
                </div>
                <div
                  className="text-7xl text-white tracking-normal leading-10 text-center max-w-xl font-light w-1/2"
                  style={{ fontFamily: '"Merriweather", serif' }}
                >
                  <Video />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
