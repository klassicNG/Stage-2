import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-r from-green-800 to-green-700 py-16">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-3 md:grid-cols-5 mt-12">
        <div className="w-full text-center text-slate-100">
          <p>
            {" "}
            Manage your tickets efficiently with Resolve, the intuitive platform
            for streamlined support.
          </p>
          <div className="flex justify-center my-3 gap-3">
            {" "}
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>
        <div className="w-full text-center text-slate-100">
          <h3>Product</h3>
          <p className="text-slate-300"> Features</p>
          <p className="text-slate-300"> Pricing </p>
          <p className="text-slate-300">Intergrations</p>
        </div>
        <div className="w-full text-center text-slate-100">
          <h3>Company</h3>
          <p className="text-slate-300"> About Us</p>
          <p className="text-slate-300"> Careers </p>
          <p className="text-slate-300">Blog</p>
        </div>
        <div className="w-full text-center text-slate-100 py-10 md:py-0">
          <h3>Resources</h3>
          <p className="text-slate-300"> Documentation</p>
          <p className="text-slate-300"> Support </p>
          <p className="text-slate-300">Community</p>
        </div>
        <div className="w-full text-center text-slate-100 py-10 md:py-0">
          <h3>Legal</h3>
          <p className="text-slate-300"> Terms of Service</p>
          <p className="text-slate-300"> Privacy Policy </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
