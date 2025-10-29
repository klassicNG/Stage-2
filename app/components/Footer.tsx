import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

// Define props to accept an optional id
interface FooterProps {
  id?: string;
}

const Footer: React.FC<FooterProps> = ({ id }) => {
  // Destructure the id prop
  return (
    // Apply the id to the footer element if it exists
    <footer
      id={id}
      className="bg-gradient-to-r from-green-800 to-green-700 py-16 text-slate-100"
    >
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        {" "}
        {/* Adjusted gap */}
        {/* Column 1: Brand & Social */}
        {/* Added text alignment and spacing */}
        <div className="md:col-span-1 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-3">Resolv</h3>
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            Manage your tickets efficiently with Resolv, the intuitive platform
            for streamlined support.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            {" "}
            {/* Increased gap & size */}
            {/* Add links around icons */}
            <a href="#" aria-label="Facebook" className="hover:text-green-300">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-green-300">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-300">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Github" className="hover:text-green-300">
              <FaGithub />
            </a>
          </div>
        </div>
        {/* Column 2: Product Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2">
            {" "}
            {/* Use list for semantics */}
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Integrations
              </a>
            </li>
          </ul>
        </div>
        {/* Column 3: Company Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Blog
              </a>
            </li>
          </ul>
        </div>
        {/* Column 4: Resources Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Community
              </a>
            </li>
          </ul>
        </div>
        {/* Column 5: Legal Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white text-sm">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Optional: Add Copyright line */}
      <div className="text-center text-slate-400 text-xs mt-12 border-t border-green-600 pt-6">
        © {new Date().getFullYear()} Resolv. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
