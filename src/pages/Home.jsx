import { Link } from "react-router-dom";
import { FaParking, FaClock, FaMobile, FaChartLine } from "react-icons/fa";


const Home = () => {
  const features = [
    {
      icon: <FaParking className="h-8 w-8 text-blue-500" />,
      title: "Real-time Availability",
      description:
        "Find available parking spots in real-time across all our locations.",
    },
    {
      icon: <FaClock className="h-8 w-8 text-blue-500" />,
      title: "Easy Booking",
      description:
        "Book your parking spot in advance or on-the-go with just a few clicks.",
    },
    {
      icon: <FaMobile className="h-8 w-8 text-blue-500" />,
      title: "Mobile Access",
      description:
        "Access your parking information and manage bookings from any device.",
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-blue-500" />,
      title: "Smart Analytics",
      description:
        "Track your parking history and expenses with detailed analytics.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Smart Parking Management</span>
              <span className="block text-blue-200">Made Simple</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find, book, and manage parking spots with ease. Save time and
              eliminate the hassle of finding parking in busy areas.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <Link
                to="/parking-lots"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 md:py-4 md:text-lg md:px-10"
              >
                View Parking Lots
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose SmartPark?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Experience the future of parking management with our smart
              features.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-600">
              Sign up now and start parking smarter.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
