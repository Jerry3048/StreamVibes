import { Fragment } from "react";
import Header from "../components/Header";
import Pricing from "../components/price";
import Footer from "../components/Footer";
import TrialBG from "../components/TrialBG";

interface Feature {
  name: string;
  plans: {
    Basic: string | number | boolean;
    Standard: string | number | boolean;
    Premium: string | number | boolean;
  };
}

const plans = ["Basic", "Standard", "Premium"];

const featureList: Feature[] = [
  {
    name: "Price",
    plans: { Basic: "$9.99/Month", Standard: "$12.99/Month", Premium: "$14.99/Month", },
  },
  {
    name: "Content",
    plans: {
      Basic:
        "Access to a wide selection of movies and shows, including some new releases.",
      Standard:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      Premium:
        "Access to the widest selection of movies and shows, including all new releases and offline viewing",
    },
  },
  {
    name: "Devices",
    plans: {
      Basic: "Watch on one device simultaneously",
      Standard: "Watch on two devices simultaneously",
      Premium: "Watch on four devices simultaneously",
    },
  },
  {
    name: "Free Trial",
    plans: { Basic: "7Days", Standard: "7Days", Premium: "7Days" },
  },
  {
    name: "Cancel Anytime",
    plans: { Basic: true, Standard: true, Premium: true },
  },
  {
    name: "HDR",
    plans: { Basic: false, Standard: true, Premium: true },
  },
  {
    name: "Dolby Atmos",
    plans: { Basic: false, Standard: false, Premium: true },
  },
  {
    name: "Ad-Free",
    plans: { Basic: false, Standard: true, Premium: true },
  },
  {
    name: "Offline Viewing",
    plans: {
      Basic: false,
      Standard: "Yes, for select titles",
      Premium: "Yes, for all titles",
    },
  },
  {
    name: "Family Sharing",
    plans: {
      Basic: false,
      Standard: "Yes, up to 5 family members",
      Premium: "Yes, up to 6 family members",
    },
  },
];

function Subscription() {
  return (
   <div className="space-y-10">
     <Header/>
     <div id="Plans"><Pricing/></div>
     <div className="w-[95%] mx-auto py-10">
        {/* Title Section */}
        <div className="text-center md:text-left mb-6" id="Features">
          <h2 className="text-3xl font-bold text-white mb-4">
            Compare our plans and find the right one for you.
          </h2>
          <p className="text-gray-300">
            StreamVibe offers three different plans to fit your needs: Basic,
            Standard, and Premium. Compare the features of each plan and choose
            the one that's right for you.
          </p>
        </div>

        {/* Scrollable Grid */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 border border-gray-700/90 min-w-[700px] rounded-xl overflow-hidden">
            {/* Header Row */}
            <div className="bg-black text-white p-4 font-bold border border-gray-700/90">
              Features
            </div>
            {plans.map((plan) => (
              <div
                key={plan}
                className="bg-black text-white p-4 font-bold border border-gray-700/90"
              >
                {plan}
                {plan === "Standard" && (
                  <span className="ml-2 bg-red-500 px-2 rounded-lg text-sm">
                    Popular
                  </span>
                )}
              </div>
            ))}

            {/* Feature Rows */}
            {featureList.map((feature, idx) => (
              <Fragment key={idx}>
                <div className="p-4 border border-gray-700/90 text-gray-300">
                  {feature.name}
                </div>
                {plans.map((plan) => {
                  const value = feature.plans[plan as keyof typeof feature.plans];
                  return (
                    <div
                      key={plan}
                      className="p-4 border border-gray-700/90 text-gray-200"
                    >
                      {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    <TrialBG/>
    <Footer/>
   </div>
  );
}

export default Subscription;
