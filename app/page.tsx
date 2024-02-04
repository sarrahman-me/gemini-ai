"use client";
import { TbMessageChatbot } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="bg-gradient-to-tl from-slate-950 via-sky-950 to-gray-950 h-screen">
      <div className="text-center py-10 pt-20">
        <h1 className="font-bold text-4xl md:text-8xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-400 inline-block text-transparent bg-clip-text">
          Gemini Tester
        </h1>
        <p className="text-white md:text-base text-sm">
          Coba Gemini ai yang dibuat oleh google tanpa perlu membuat aplikasinya
          sendiri
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 md:mx-10 my-10 md:my-20">
        <CardFeature
          href="/chat"
          title={"Chat"}
          icon={<TbMessageChatbot />}
          description={
            "Gemini Chat memungkinkan Anda membangun pengalaman obrolan interaktif dengan mudah. Dengan kecerdasan tinggi dari model Gemini Pro, pengguna dapat menikmati obrolan yang responsif dan kontekstual untuk berbagai keperluan."
          }
        />
        <CardFeature
          href="/generated"
          title={"Generated Text"}
          icon={<RiAiGenerate />}
          description={
            "Generated Text dari Gemini Pro memberikan kemampuan untuk menghasilkan teks berkualitas tinggi dengan berbagai konten. Mulai dari pembuatan artikel, paragraf inspiratif, hingga konten-konten kreatif, Gemini Pro dapat menghasilkan teks yang sesuai dengan kebutuhan Anda."
          }
        />
      </div>

      <p className="text-white text-xs text-center mt-10">
        Created By Sarrahman
      </p>
    </main>
  );
}

const CardFeature = ({
  title,
  icon,
  href,
  description,
}: {
  title: string;
  icon: any;
  description: string;
  href: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="text-white border space-y-3 border-white bg-gradient-to-bl from-slate-900 to-gray-900 w-full rounded-md p-2 hover:via-sky-950 transition-colors ease-linear cursor-pointer"
    >
      <div className="flex items-center space-x-2">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-sm md:text-base">{title}</h3>
      </div>
      <p className="text-xs md:text-sm">{description}</p>
    </div>
  );
};
