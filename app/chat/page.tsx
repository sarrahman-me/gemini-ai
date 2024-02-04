"use client";
import { TbMessageChatbot } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { PostDataApi } from "@/src/utils/fetching";
import formatText from "@/src/utils/formatTextChat";

interface Message {
  role: string;
  parts: string;
}

export default function Chat() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Message[]>(
    [] as { role: string; parts: string }[]
  );

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (inputMessage.trim() === "") return;

    const responseApi = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/tilebot/chat`,
      {
        chatHistory,
        message: inputMessage,
      }
    );

    const { message } = responseApi.data;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: "user",
        parts: inputMessage,
      },
    ]);

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: "model",
        parts: message,
      },
    ]);

    setInputMessage("");
    setLoading(false);
  };

  return (
    <main className="bg-gradient-to-tl from-slate-950 via-sky-950 to-gray-950 min-h-screen">
      <header className="text-white bg-gradient-to-t from-slate-950 via-sky-950 to-gray-950 justify-center flex items-center text-xl md:text-3xl space-x-2 p-3 sticky top-0 z-50">
        <TbMessageChatbot />
        <h2>Gemini Chat</h2>
      </header>

      <div className="p-2 md:p-3 overflow-y-auto space-y-2 pb-20 md:pb-28">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`text-white ${
              message.role === "model" ? "bg-sky-900" : "bg-gray-900"
            } rounded-md p-2`}
          >
            {formatText(message.parts)}
          </div>
        ))}

        <div className={`${!loading ? "hidden" : "p-2 md:p-3 text-white"}`}>
          Tunggu Sebentar ...
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-0 left-0 right-0 p-3 flex items-center"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 text-white p-2 md:p-3 bg-gradient-to-bl from-slate-900 to-gray-900 rounded-full border border-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 p-3 bg-gradient-to-bl from-slate-700 via-sky-700 to-gray-700 rounded-full disabled:bg-gray-900"
        >
          <IoSend className="text-white md:text-2xl text-xl" />
        </button>
      </form>
    </main>
  );
}
