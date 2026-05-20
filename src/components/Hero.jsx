 'use client';
 
 import { useState } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [location, setLocation] = useState('');

  return (
    <section className="relative w-full bg-gradient-to-r from-green-900 to-orange-200 overflow-hidden">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the Right Dog for You
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Take our interactive new quiz to find the perfect dog to adopt!
          </p>

          <div className="bg-white rounded-full flex items-center p-1 shadow-lg max-w-lg">
            <input
              type="text"
              placeholder="Enter your location"
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-r-full hover:bg-purple-700 transition">
              Search
            </button>
          </div>

          <div className="flex gap-4 mt-4 text-purple-900 font-medium">
            <button className="px-4 py-2 bg-white rounded-full hover:bg-gray-100 transition flex items-center gap-2">
              <span>Find a dog</span>
            </button>
            <button className="px-4 py-2 bg-white rounded-full hover:bg-gray-100 transition flex items-center gap-2">
              <span>Find a cat</span>
            </button>
            <button className="px-4 py-2 bg-white rounded-full hover:bg-gray-100 transition flex items-center gap-2">
              <span>Find other pets</span>
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 relative h-64 md:h-96">
          {/* <image
            src={logo}
            alt="Dog"
            className="object-cover rounded-3xl"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;