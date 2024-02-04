import React, { ReactNode } from "react";

const formatTextSection = (text: string) => {
  const tableRegex = /\|(.*)\|/g;

  if (text.match(tableRegex)) {
    // Jika terdapat format tabel, konversi ke elemen tabel
    const rows = text.split("\n").map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row
          .replace(/^\|/, "") // Hapus karakter | di awal baris
          .replace(/\|$/, "") // Hapus karakter | di akhir baris
          .split("|")
          .map((cell, cellIndex) => (
            <td key={cellIndex} className="border px-4 py-2">
              {cell.trim()}
            </td>
          ))}
      </tr>
    ));

    return [
      <table key="table" className="border-collapse border">
        <tbody key="tbody">{rows}</tbody>
      </table>,
    ];
  }

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
