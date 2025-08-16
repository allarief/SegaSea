'use client';
import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative mx-10 my-8 h-[400px] rounded-lg overflow-hidden shadow-lg">
      <Image
        src="/banner1.jpg"
        alt="Banner SegaSea"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome To SegaSea
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover the Best Beach for You
        </p>
        <a
          href="/explore"
          className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-full hover:bg-green-100 transition"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
}
