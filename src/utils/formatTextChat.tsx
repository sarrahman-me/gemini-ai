import React, { ReactNode } from "react";

const formatTextSection = (text: string) => {
  return text.split("\n\n").map((section, sectionIndex) => (
    <div key={sectionIndex} className="mb-4">
      {section.split("\n").map((row, rowIndex) => (
        <div key={rowIndex} className="mb-2">
          <span>{row}</span>
        </div>
      ))}
    </div>
  ));
};

const formatText = (text: string): ReactNode => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const codeRegex = /```([\s\S]*?)```/g;

  let resultFormatted: ReactNode[] | string = text;

  if (text.match(boldRegex)) {
    resultFormatted = resultFormatted.split(boldRegex).map((part, index) => {
      return index % 2 === 0 ? (
        <span key={index}>{formatTextSection(part)}</span>
      ) : (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      );
    });
  } else if (text.match(codeRegex)) {
    resultFormatted = resultFormatted.split(codeRegex).map((part, index) => {
      return index % 2 === 0 ? (
        <span key={index}>{formatTextSection(part)}</span>
      ) : (
        <div className="bg-black text-white font-mono text-sm sm:text-md rounded-md my-10">
          <code key={index}>{formatTextSection(part)}</code>
        </div>
      );
    });
  } else {
    resultFormatted = formatTextSection(resultFormatted as string);
  }

  return <>{resultFormatted}</>;
};

export default formatText;
