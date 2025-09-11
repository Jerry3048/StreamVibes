import { useState } from "react";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Basic",
      description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: { monthly: "₦5,000", yearly: "₦50,000" },
    },
    {
      name: "General",
      description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      price: { monthly: "₦10,000", yearly: "₦100,000" },
    },
    {
      name: "Premium",
      description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      price: { monthly: "₦20,000", yearly: "₦200,000" },
    },
  ];

  return (
    <div className="text-white mb-8 space-y-8 px-4 sm:px-6 lg:px-12">
    {/* Header + Toggle */}
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 w-full">
        {/* Text */}
        <div className="text-center md:text-left max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Choose the plan that's right for you
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
        </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center md:justify-end">
        <div className="bg-black/90 p-1 rounded-lg flex">
            <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                billing === "monthly" ? "bg-gray-600 text-white" : "text-gray-400"
            }`}
            >
            Monthly
            </button>
            <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                billing === "yearly" ? "bg-gray-600 text-white" : "text-gray-400"
            }`}
            >
            Yearly
            </button>
        </div>
        </div>
    </div>

    {/* Pricing Cards */}
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {plans.map((plan, idx) => (
        <div
            key={idx}
            className="bg-black/90 rounded-2xl shadow-lg p-6 flex flex-col transition-transform hover:scale-105"
        >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-gray-300">{plan.description}</p>
            <p className="mt-4 text-3xl font-bold">
            {plan.price[billing]}
            <span className="text-sm font-normal text-gray-400">
                {" "}
                /{billing}
            </span>
            </p>

           <div className="flex justify-center space-x-4">
            <button className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">
              start a {plan.name} trial
              </button>
              <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
              Choose {plan.name}
              </button>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
}