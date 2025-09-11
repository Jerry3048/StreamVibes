import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// Define the FAQ type
interface FAQ {
 id:string
  question: string;
  answer: string;
}

// FAQ list
const faqs: FAQ[] = [
   {
    id:"01",
    question: "How do I subscribe to the streaming service?",
    answer:
      "You can subscribe by creating an account and choosing a subscription plan. Payments can be made securely with your debit/credit card or supported wallets.",
  },
  {
    id:"02",
    question: "Can I watch movies offline?",
    answer:
      "Yes, you can download movies and TV shows on supported devices to watch offline anytime.",
  },
  {
    id:"03",
    question: "What devices are supported?",
    answer:
      "Our service works on smartphones, tablets, laptops, smart TVs, gaming consoles, and VR headsets.",
  },
  {
    id:"04",
    question: "Do you offer a free trial?",
    answer:
      "Yes, new users can enjoy a 7-day free trial before choosing a paid subscription plan.",
  },
  {
    id:"05",
    question: "Can I share my account with family?",
    answer:
      "Yes, depending on your subscription plan, you can stream on multiple devices simultaneously and create different profiles for family members.",
  },
  { 
    id:"06",
    question: "Is the content available worldwide?",
    answer:
      "Most movies and shows are available globally, but some titles may be restricted due to licensing agreements.",
  },
];

export default function FAQSection() {
  // null means no item is open, otherwise store index (number)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4">
        <div>
            <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
            </h2>
            <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
          Ask a Question
        </button>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {faqs.map((faq: FAQ, index: number) => (
        <div
        key={index}
        className="relative w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-gradient-to-r after:from-black/0 after:via-red-500 after:to-black/30 h-fit"
        >
        <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium rounded-xl transition"
        >
            {/* Left side: ID + Question */}
            <div className="flex items-center space-x-3">
            <span className="bg-gray-800/50 rounded-lg px-3 py-1 text-sm">
                {faq.id}
            </span>
            <span>{faq.question}</span>
            </div>

            {/* Right side: + / - */}
            {openIndex === index ? <FaMinus /> : <FaPlus />}
        </button>

        {openIndex === index && (
            <div className="px-4 pb-4 text-sm font-light">{faq.answer}</div>
        )}
        </div>
    ))}
    </div>
      
    </div>
  );
}