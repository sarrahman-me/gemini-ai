const formatText = (message: string) => {
  return message.split("\n\n").map((section, sectionIndex) => (
    <div key={sectionIndex} className="mb-4">
      {section.split("\n").map((row, rowIndex) => (
        <div key={rowIndex} className="mb-2">
          {row.trim() &&
            (row.includes("**") ? (
              <>{formatTextToBold(row)}</>
            ) : (
              <span>{row}</span>
            ))}
        </div>
      ))}
    </div>
  ));
};

const formatTextToBold = (text: string) => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  return text.split(boldRegex).map((part, index) => {
    return index % 2 === 0 ? (
      <span key={index}>{part}</span>
    ) : (
      <strong key={index} className="font-bold">
        {part}
      </strong>
    );
  });
};

export default formatText;
