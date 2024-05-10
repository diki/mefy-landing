import "./App.css";

import Canvas from "./lorenz2";

const App = () => {
  return (
    <main className="bg-gradient-to-r from-orange-50 to-orange-100">
      <section className="flex h-screen w-full">
        <div id="container" className="flex flex-col h-screen w-full">
          <div className="flex flex-col sm:flex-row bg-gray-600 h-screen w-full bg-gradient-to-r from-orange-50 to-orange-100">
            <div className="sm:w-full md:w-1/2 flex flex-col justify-center sm:px-20 px-8 order-2 sm:order-1 -ml-16">
              <h1 className="text-7xl font-bold metallic-text text-left mb-12">
                Your AI sidekick
              </h1>
              <div className="text-2xl text-gray-900 tracking-normal leading-10">
                Seamlessly and constantly learning from your interactions,
                mefy.ai remembers and organizes the content you like and learns
                from it. Tailored to continuously enhance both your searches and
                your sentences, perfectly adapting to your unique style.
              </div>
              <button className="border border-green-200 text-gray-950  px-6 rounded-lg shadow-lg bg-green-300 hover:bg-green-300 transition duration-300 w-96 py-4 mt-16 tracking-wide">
                Learn more
              </button>
            </div>
            <Canvas />
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
