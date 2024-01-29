import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" relative h-screen bg-[#000000] ">
      <Image
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
        height="1080"
        src="/IOT-background.png"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width="1920"
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Welcome to Our Platform
        </h1>
        <p className="mt-4 text-xl text-white sm:text-2xl md:text-3xl">
          The place to control your lights
        </p>
        <div className="mt-8 max-w-md mx-auto sm:max-w-xl md:max-w-full">
          <div className="relative">
            <Link href={"dashboard"}>
              <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Get started by going to the dashboard
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
