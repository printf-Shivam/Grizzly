import React from "react";
import FbIcon from "../common/FbIcon";
import InstaIcon from "../common/InstaIcon";

const Footer = ({ content }) => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      {/* Grid for footer sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {content?.items?.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4">{item?.title}</h4>

            {item?.list?.map((listItem, idx) => (
              <a
                key={idx}
                href={listItem?.path}
                className="text-sm text-gray-300 hover:text-white py-1 transition-colors"
              >
                {listItem?.label}
              </a>
            ))}

            {item?.description && (
              <p className="mt-3 text-sm text-gray-400">{item?.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        {/* Social icons */}
        <div className="flex gap-4 justify-center mb-4">
          <a href="/fb" className="hover:opacity-80 transition-opacity">
            <FbIcon />
          </a>
          <a href="/insta" className="hover:opacity-80 transition-opacity">
            <InstaIcon />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center">
          {content?.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
