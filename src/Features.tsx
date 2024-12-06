import { useState } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  content: string;
}

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);

  const features: Feature[] = [
    {
      id: 1,
      title: "Knowledge",
      description:
        "Fin AI Agent learns everything about your company and product, using all of your knowledge to generate accurate answers.",
      content: "Knowledge content here",
    },
    {
      id: 2,
      title: "Behavior",
      description:
        "Fin is reliable, speaks in your tone of voice, and follows your policies and procedures to deliver the best possible customer experience.",
      content: "Behavior content here",
    },
    {
      id: 3,
      title: "Actions",
      description:
        "Fin personalizes its service for every customer wherever they are, taking actions on their behalf, and adjusting quickly to serve their",
      content: "Actions content here",
    },
    {
      id: 4,
      title: "Insights",
      description:
        "AI-generated insights give you visibility over your entire support organization, so you can trust that Fin is delivering the highest quality support at all times.",
      content: "Insights content here",
    },
  ];

  return (
    <div className="w-full flex items-center justify-between px-20">
      {/* Left Features */}
      <div className="flex flex-col gap-8 w-[25%]">
        {features.slice(0, 2).map((feature) => (
          <div
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            className={`mb-8 cursor-pointer transition-all duration-300 ${
              activeFeature === feature.id
                ? "opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
          >
            <div className="w-full border border-gray-700 mb-4"></div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Center Showcase */}
      <div className="h-[70vh] w-[30vw] bg-white mt-12 rounded-md border border-gray-300 p-6">
        {features.find((f) => f.id === activeFeature)?.content}
      </div>

      {/* Right Features */}
      <div className="flex flex-col gap-8 w-[25%]">
        {features.slice(2, 4).map((feature) => (
          <div
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            className={`mb-8 cursor-pointer transition-all duration-300 ${
              activeFeature === feature.id
                ? "opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
          >
            <div className="w-full border border-gray-700 mb-4"></div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
