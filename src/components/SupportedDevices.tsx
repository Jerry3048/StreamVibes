import {   FaTabletAlt,
  FaMobileAlt,
  FaTv,
  FaLaptop,
  FaGamepad,
  FaVrCardboard } from "react-icons/fa"; // Icon (you can change it if you like)

export default function SupportedDevices() {
  const devices = [
    {
      name: "Smartphones",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaMobileAlt className="w-6 h-6 text-red-500" />,
    },
     {
      name: "Smart TV",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaTv className="w-6 h-6 text-red-500" />,
    },
    {
      name: "Laptops",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaLaptop className="w-6 h-6 text-red-500" />,
    },
    {
      name: "Gaming Consoles",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaGamepad className="w-6 h-6 text-red-500" />,
    },
    {
      name: "VR Headsets",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaVrCardboard className="w-6 h-6 text-red-500" />,
    },
     {
      name: "Tablets",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      icon: <FaTabletAlt className="w-6 h-6 text-red-500" />,
    },
    // You can add more supported devices here (e.g., Tablets, Smart TVs, etc.)
  ];


  return (
    <div className="px-5">
     <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4 ">We Provide you streaming experience across various devices.</h2>
          <p className="max-w-80%">With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</p>
     </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-3">
        {devices.map((device, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-tr from-black to-red-500/20 rounded-xl shadow-xl p-2 flex flex-col items-center hover:scale-105 transition-transform "
            >
            <div className="flex justify-start items-center w-full space-x-4">
                <div className="p-2 bg-gray-900/100 rounded-lg">{device.icon}</div>
                <h3 className="text-xl font-semibold text-white ">
                {device.name}
                </h3>
            </div>
            <p className="text-gray-300 text-sm mt-2">{device.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
}