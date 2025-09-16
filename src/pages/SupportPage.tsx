// src/pages/Support.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import FAQSection from "../components/FAQSection";
import TrialBG from "../components/TrialBG";
import Footer from "../components/Footer";
import Image from "/Container.png"

interface Country {
  cca2: string;
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; svg: string };
}

function SupportPage () {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

 useEffect(() => {
  const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(
          "    https://restcountries.com/v3.1/all?fields=name,cca3,flags,idd"
        );
        const filtered = response.data.filter(
          (c) => c.idd?.root && c.idd?.suffixes
        );

        // Sort alphabetically
        filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(filtered);

        // ✅ Default Nigeria
        const nigeria = filtered.find(
          (c) => c.name.common.toLowerCase() === "nigeria"
        );
        if (nigeria) {
          const dial = `${nigeria.idd.root}${nigeria.idd.suffixes?.[0]}`;
          setSelectedCode(dial);
          setSelectedCountry(nigeria);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (value: string) => {
    setSelectedCode(value);
    const country = countries.find(
      (c) => `${c.idd.root}${c.idd.suffixes?.[0]}` === value
    );
    setSelectedCountry(country || null);
  };

  return (
    <div className="space-y-10">
        <Header/>
       <div className="grid grid-cols-1 md:grid-cols-2 w-[95%] mx-auto">
        {/* Left side */}
        <div className="flex flex-col justify-center space-y-4 text-left px-4">
            <h1 className="text-4xl font-bold">
            Welcome to our Support Page!
            </h1>
            <p className="text-lg max-w-md">
           We're here to help you with any problems you may be having with our product.
            </p>

            {/* Image with overlay */}
            <div className="relative w-full">
            <img
                src={Image}
                alt="Logo"
                className="w-full object-cover rounded-lg max-h-90 border-2 border-gray-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
            </div>
        </div>

          {/* Right side - form */}
          <div className="flex items-center justify-center bg-black rounded-lg mt-10 md:mt-0 p-4">
            <form className="w-full  lg:p-6 p-2 rounded-2xl shadow-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                    First Name
                    <input
                      type="text"
                      placeholder="First Name"
                      className=" p-2 rounded w-full bg-gray-900/90 border-1 border-gray-700"
                    />
                </div>
                <div>
                    LastName
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="p-2 rounded w-full bg-gray-900/90 border-1 border-gray-700"
                    />
                </div>
              </div>
    
              <div>
                  Email
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded w-full bg-gray-900/90 border-1 border-gray-700"
                  />
              </div>
    
            {/* Phone with country code */}
            <div>
                Phone Number
                <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1 border w-[65px] rounded p-2 bg-black/90">
                        {selectedCountry && (
                            <div className="flex items-center gap-2 border">
                            <img
                                src={selectedCountry.flags.png}
                                alt={selectedCountry.name.common}
                                className="w-7 h-4  rounded"
                            />
                            </div>
                        )}
                
                        {/* Country dropdown */}
                        <select
                            className="rounded w-[50%] bg-black/90 text-white"
                            value={selectedCode}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            {countries.map((country) => (
                            <option
                                key={country.name.common}
                                value={`${country.idd.root}${country.idd.suffixes?.[0]}`}
                            >
                                {country.name.common} ({country.idd.root}{country.idd.suffixes?.[0]})
                            </option>
                            ))}
                        </select>
                </div>
        
                    {/* Phone input */}
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="p-2 rounded w-full bg-gray-900/90 border-1 border-gray-700"
                    />
                  </div>
            </div>
    
              <textarea
                placeholder="Message"
                className="p-2 rounded w-full bg-gray-900/90 border-1 border-gray-700 h-28"
              ></textarea>
    
              <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="rules" className="h-4 w-4" />
                    <label htmlFor="rules" className="text-sm">
                      I agree to the rules
                    </label>
                  </div>
        
                  <button
                    type="submit"
                    className="w-fit bg-red-600 text-white p-2 rounded hover:bg-red-700"
                  >
                    Send Message
                  </button>
              </div>
            </form>
          </div>
        </div>
        <FAQSection/>
        <TrialBG/>
        <Footer/>
    </div>
  );
};

export default SupportPage;
