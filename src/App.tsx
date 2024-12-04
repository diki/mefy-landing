import "./App.css";

import Canvas from "./lorenz2";
// import TypingAnimation from "./TypingAnimation";

const App = () => {
  return (
    <main className="">
      <section className="flex w-full">
        <div id="container" className="flex flex-col w-full">
          <div className="fixed top-0 left-0 w-full flex justify-center">
            <Canvas />
          </div>
          <div className="bg-gradient-to-b from-black to-neutral-900">
            <div
              className="flex flex-col items-center w-full relative h-[100vh] "
              id="hero"
            >
              <div className=" text-white max-w-2xl flex flex-col items-center gap-6 mt-36 z-10">
                <h1
                  className={
                    "font-display font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem] text-9xl"
                  }
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
                  <button className="border-2 border-white  text-white  rounded-lg bg-neutral-900   transition duration-300 py-1 text-xs px-4 font-bold">
                    Learn more
                  </button>
                  <button className="border text-black rounded-lg shadow-lg bg-white text-black  transition duration-300 py-2 text-xs px-4 font-bold">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-center w-full relative h-[100vh] "
              id="hero"
            >
              <div className=" text-white max-w-2xl flex flex-col items-center gap-6 mt-36 z-10">
                <h1
                  className={
                    "font-display font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem] text-9xl"
                  }
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
                  <button className="border-2 border-white  text-white  rounded-lg bg-neutral-900   transition duration-300 py-1 text-xs px-4 font-bold">
                    Learn more
                  </button>
                  <button className="border text-black rounded-lg shadow-lg bg-white text-black  transition duration-300 py-2 text-xs px-4 font-bold">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="flex flex-col items-center w-full relative h-[100vh] bg-neutral-900 -z-10"
            id="hero"
          ></div> */}
        </div>
      </section>
    </main>
  );
};

export default App;
