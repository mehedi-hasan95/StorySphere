import Image from "next/image";

export const Hero = () => {
  return (
    <div className="bg-[#FFC017]">
      <div className="max-w-6xl mx-auto py-12 md:py-16 lg:py-20 flex flex-col gap-y-6 px-6 relative overflow-y-hidden">
        <h2 className="font-merriweather text-3xl md:text-4xl lg:text-8xl font-semibold">
          Stay curious.
        </h2>
        <p className="text-lg font-semibold max-w-96">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Image
          src="/hero.png"
          alt="story sphere"
          height={500}
          width={500}
          className="h-96 w-96 absolute right-0 top-0 hidden md:block"
        />
      </div>
    </div>
  );
};
