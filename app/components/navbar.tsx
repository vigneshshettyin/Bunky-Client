import { useState } from "react";
import { Droplet, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("daily-sales");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              RSS Buddy v2
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {["Daily Sales", "Live Stock", "Create Sale"].map((item) => (
              <Link
                key={item}
                href="#"
                className={`text-sm font-medium ${
                  activeSection === item.toLowerCase().replace(" ", "-")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } px-3 py-2`}
                onClick={() =>
                  setActiveSection(item.toLowerCase().replace(" ", "-"))
                }
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="pt-2 pb-3 space-y-1">
            {["Daily Sales", "Live Stock", "Create Sale"].map((item) => (
              <Link
                key={item}
                href="#"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  activeSection === item.toLowerCase().replace(" ", "-")
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                } text-base font-medium`}
                onClick={() => {
                  setActiveSection(item.toLowerCase().replace(" ", "-"));
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
