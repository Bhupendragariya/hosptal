import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Health is Our
              <span className="text-blue-200"> Priority</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Experience world-class healthcare with our team of expert doctors and 
              state-of-the-art medical facilities. We're here to provide you with 
              the best care possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/appointment"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Book Appointment
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/hero.png"
              alt="Healthcare"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;