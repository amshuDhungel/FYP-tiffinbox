import { useContext } from "react";
import { UserContext } from "../context";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative md:flex">
            {/* Image */}
            <img
              className="h-96 md:h-full w-full object-cover md:w-64 z-0"
              src="/images/default.jpg"
              alt="image"
            />
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />
            {/* Content */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
              <div className="p-8 text-white">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Welcome to Our Website
                </div>
                <p className="mt-2 text-gray-200">
                  Explore our delicious menu and find your favorite dishes.
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block bg-indigo-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2"
                  >
                    View Menu
                  </a>
                  <a
                    href="#"
                    className="inline-block bg-gray-300 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
