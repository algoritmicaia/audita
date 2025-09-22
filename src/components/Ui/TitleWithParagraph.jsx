import React from "react";

export const TitleWithParagraph = ({ title, text }) => {
  return (
    <div>
      <div className="flex-1 text-left">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 cursor-pointer transition-colors duration-200 flex items-center justify-between">
          {title}
        </h1>

        <p className="text-sm lg:text-lg text-gray-700 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};
