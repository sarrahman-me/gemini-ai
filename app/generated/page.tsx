"use client";
import { RiAiGenerate, RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { PostDataApi } from "@/src/utils/fetching";
import formatText from "@/src/utils/formatTextChat";
import Image from "next/image";

export default function Chat() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [responseModel, setResponseModel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fungsi untuk menangani pemilihan gambar
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setSelectedImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (inputMessage.trim() === "") return;

    const responseApi = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/tilebot/generate`,
      {
        message: inputMessage,
        image: selectedImage,
      }
    );

    const { message } = responseApi.data;
    setResponseModel(message);

    setSelectedImage("");
    setInputMessage("");
    setLoading(false);
  };

  return (
    <main className="bg-gradient-to-tl from-slate-950 via-sky-950 to-gray-950 min-h-screen">
      <header className="text-white bg-gradient-to-t from-slate-950 via-sky-950 to-gray-950 justify-center flex items-center text-xl md:text-3xl space-x-2 p-3 sticky top-0 z-50">
        <RiAiGenerate />
        <h2>Gemini Generated</h2>
      </header>

      <div className="p-2 md:p-3 overflow-y-auto space-y-2 pb-20 md:pb-28">
        {selectedImage && (
          <div className="flex justify-center">
            <Image
              src={selectedImage}
              alt={"image prompt"}
              width={300}
              height={300}
            />
          </div>
        )}

        <div className={`text-white rounded-md p-2`}>
          {formatText(responseModel)}
        </div>

        <div className={`${!loading ? "hidden" : "p-2 md:p-3 text-white"}`}>
          Tunggu Sebentar ...
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-0 left-0 right-0 p-3 flex items-center"
      >
        <label htmlFor="imageInput" className="mr-2">
          <RiImageAddFill className="text-white cursor-pointer md:text-3xl text-2xl" />
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
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
