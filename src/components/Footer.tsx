import { FaFacebookF, FaTwitter, FaInstagram,} from "react-icons/fa";
import { useNavigate} from "react-router";


export default function Footer() {
   const navigate = useNavigate();


  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-16">
    <div className="max-w-[90%] mx-auto">
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center ">
              {/* Column 1 */}
              <div>
                <h3 className="text-white font-semibold mb-4" onClick={()=> navigate("/")}>Home</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href ="#Cartegory">Cartegory</a></li>
                  <li><a href ="#Devices">Device</a></li>
                  <li><a href ="#Pricing">Pricing</a></li>
                  <li><a href ="#FAQ">FAQ</a></li>
                </ul>
              </div>
      
              {/* Column 2 */}
              <div>
                <h3 className="text-white font-semibold mb-4"
                onClick={()=> navigate("/movies-shows")}>Movies</h3>
                <ul className="space-y-2 text-gray-400">
                   <li><a href ="#GenresMovies">Genres</a></li>
                   <li><a href ="#TrendingMovies">Trending</a></li>
                   <li><a href ="#NewReleaseMovies">New Release</a></li>
                    <li><a href ="#PopularMovies">Popular</a></li>
                </ul>
              </div>
      
              {/* Column 3 */}
              <div>
                <h3 className="text-white font-semibold mb-4"
                onClick={()=> navigate("/movies-shows")}>Shows</h3>
                <ul className="space-y-2 text-gray-400">
                   <li><a href ="#GenresShows">Genres</a></li>
                   <li><a href ="#TrendingShows">Trending</a></li>
                   <li><a href ="#TopRatedShows">Top Rated</a></li>
                    <li><a href ="#PopularShows">Popular</a></li>
                </ul>
              </div>
      
              {/* Column 4 */}
              <div>
                <h3 className="text-white font-semibold mb-4"
                onClick={()=> navigate("/support")}>Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href ="#ContactUs">Contact Us</a></li>
                </ul>
              </div>
      
              {/* Column 5 */}
              <div>
                <h3 className="text-white font-semibold mb-4"
                onClick={()=> navigate("/subscription")}>Subscripion</h3>
                <ul className="space-y-2 text-gray-400 ">
                  <li><a href ="#Plans">Plans</a></li>
                  <li><a href ="#Features">Features</a></li>
                </ul>
              </div>
      
              {/* Column 6 */}
              <div>
                <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
                <ul className="flex space-x-2 cursor-pointer">
                      <div className="p-2 bg-gray-900/100  rounded-lg"><FaFacebookF  className="w-7 h-7"/></div>
                      <div className="p-2 bg-gray-900/100  rounded-lg"><FaTwitter className="w-7 h-7"/></div>
                      <div className="p-2 bg-gray-900/100  rounded-lg"><FaInstagram className="w-7 h-7"/></div>

                  </ul>
              </div>
            </div>
      
            {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="">
                ©2023 StreamVibe, All Rights Reserved
              </div>
              <div className=" flex space-x-4 justify-center md:justify-end">
                <p className="border-r border-gray-700 pr-3">Terms of Use</p>
                <p className="border-r border-gray-700 pr-3">Privacy Policy</p>
                <p>Cookie Policy</p>
              </div>
          </div>
    </div>
    </footer>
  );
}