import { TbMessageChatbot } from "react-icons/tb";
import { IoSend } from "react-icons/io5";

export default function Chat() {
  return (
    <main className="bg-gradient-to-tl from-slate-950 via-sky-950 to-gray-950 h-screen">
      <header className="text-white justify-center flex items-center text-xl md:text-3xl space-x-2 p-3 border border-sky-950">
        <TbMessageChatbot />
        <h2>Gemini Chat</h2>
      </header>

      {/*  */}

      <div className="fixed bottom-0 left-0 right-0 p-3 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 text-white p-2 md:p-3 bg-gradient-to-bl from-slate-900 to-gray-900 rounded-full border border-white focus:outline-none"
        />
        <button className="ml-2 p-3 bg-gradient-to-bl from-slate-700 via-sky-700 to-gray-700 rounded-full">
          <IoSend className="text-white" />
        </button>
      </div>
    </main>
  );
}
