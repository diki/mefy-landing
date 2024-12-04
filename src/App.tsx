import "./App.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Canvas from "./lorenz2";

const App = () => {
  const controls = useAnimation();
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;

      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element has been scrolled into view
      const elementTop = rect.top;
      const visiblePortion = windowHeight - elementTop;

      // Adjust the divisor to make the animation complete faster
      // Using just elementHeight makes the animation complete roughly when the element is fully in view
      const progress = Math.min(
        Math.max(visiblePortion / (windowHeight * 0.6), 0),
        1
      );

      // Calculate how many words should be white based on scroll progress
      const text =
        "Build powerful AI workflows that drive organic growth by combining top models, brand assets, and ready-to-use integrations";
      const words = text.split(" ");
      const wordCount = words.length;
      const activeWords = Math.floor(progress * wordCount);

      // Update each word's color based on its position and scroll progress
      words.forEach((_, index) => {
        controls.start((i) => ({
          color: i < activeWords ? "#ffffff" : "#333",
          transition: { duration: 0.1 },
        }));
      });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Initial check
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
          <div className="bg-gradient-to-b from-black to-neutral-900">
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
                  Jot/Ops
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
                  className="text-4xl text-center w-full max-w-2xl font-semibold"
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
              className="flex flex-col items-center w-full relative min-h-screen"
              id="hero"
            >
              s
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
