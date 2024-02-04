import React, { ReactNode } from "react";

const formatTextSection = (text: string) => {
  return text.split("\n\n").map((section, sectionIndex) => (
    <div key={sectionIndex} className="mb-5">
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
          {formatTextSection(part)}
        </strong>
      );
    });
  } else if (text.match(codeRegex)) {
    resultFormatted = resultFormatted.split(codeRegex).map((part, index) => {
      return index % 2 === 0 ? (
        <span key={index}>{formatTextSection(part)}</span>
      ) : (
        <code key={index} className="bg-black text-sky-500 font-mono">
          {formatTextSection(part)}
        </code>
      );
    });
  } else {
    resultFormatted = formatTextSection(resultFormatted as string);
  }

  return <>{resultFormatted}</>;
};

export default formatText;
