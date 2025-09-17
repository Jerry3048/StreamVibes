import Header from "../components/Header";
import Pricing from "../components/price";
import Footer from "../components/Footer";
import TrialBG from "../components/TrialBG";

type PlanType = "Basic" | "Standard" | "Premium";

interface Feature {
  name: string;
  plans: Record<PlanType, string | number | boolean>;
}

// Strongly typed feature list
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



function Subscription () {
  const plans: PlanType[] = ["Basic", "Standard", "Premium"];

  return (
   <div className="space-y-10">
    <Header/>
    <Pricing/>
      <div className="overflow-x-auto py-10 w-[95%] mx-auto rounded-lg  ">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-lg font-urbanistmedium text-white">
              <th className="text-left p-4 border border-gray-700/90 bg-black">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan}
                  className="text-center p-4 border border-gray-700/90 bg-black rounded-lg"
                >
                  {plan}
                  {plan === "Standard" && (
                    <span className="bg-red-500 ml-2 rounded-lg px-2">
                      Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureList.map((feature, index) => (
              <tr key={index} className="border-b border-gray-700/90 text-gray-400">
                <td className="p-4  border border-gray-700/90">
                  {feature.name}
                </td>
                {plans.map((plan) => {
                  const value = feature.plans[plan];
                  return (
                    <td
                      key={plan}
                      className="p-4 border border-gray-700/90"
                    >
                      {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TrialBG/>
      <Footer/>
   </div>
  );
};

export default Subscription;
