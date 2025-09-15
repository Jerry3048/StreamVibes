// src/pages/Support.tsx
import { useEffect, useState } from "react";
import axios from "axios";


interface Country {
  cca2: string;
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; svg: string };
}

function SupportPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v3.1/all"
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
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left side with background */}
      <div className="relative flex items-center justify-center bg-gray-900 text-white p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to our Support Page
          </h1>
          <p className="text-lg max-w-md mx-auto">
            We’re here to help you. Fill out the form and our team will get back
            to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex items-center justify-center bg-white">
        <form className="w-full max-w-md p-6 rounded-2xl shadow-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              First Name
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              Last Name
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
          />

          {/* Phone with country code */}
          <div className="flex gap-2 items-center">
            {/* Selected flag + dial code */}
           {selectedCountry && (
            <div className="flex items-center space-x-2 border p-2 rounded bg-white shadow">
              <img
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                className="w-6 h-4 object-cover rounded"
              />
              <span className="font-medium">{selectedCode}</span>
            </div>
          )}

          {/* Dropdown */}
          <select
            className="border p-2 rounded w-[60%]"
            value={selectedCode}
            onChange={(e) => handleChange(e.target.value)}
          >
            {countries.map((country) => (
              <option
                key={country.cca2}
                value={`${country.idd.root}${country.idd.suffixes?.[0]}`}
              >
                {`${country.idd.root}${country.idd.suffixes?.[0]}`} -{" "}
                {country.name.common}
              </option>
            ))}
          </select>

            {/* Phone input */}
            <input
              type="tel"
              placeholder="Phone Number"
              className="border p-2 rounded flex-1"
            />
          </div>

          <textarea
            placeholder="Message"
            className="border p-2 rounded w-full h-28"
          ></textarea>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="rules" className="h-4 w-4" />
            <label htmlFor="rules" className="text-sm">
              I agree to the rules
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupportPage;
