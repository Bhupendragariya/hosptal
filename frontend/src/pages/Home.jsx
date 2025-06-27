import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHospital, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Departments from '../components/Departments';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div className="flex flex-col items-center">
              <FaUserMd className="text-4xl mb-4" />
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-blue-100">Expert Doctors</p>
            </div>
            <div className="flex flex-col items-center">
              <FaHospital className="text-4xl mb-4" />
              <h3 className="text-3xl font-bold">10+</h3>
              <p className="text-blue-100">Departments</p>
            </div>
            <div className="flex flex-col items-center">
              <FaAmbulance className="text-4xl mb-4" />
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-blue-100">Emergency Service</p>
            </div>
            <div className="flex flex-col items-center">
              <FaHeartbeat className="text-4xl mb-4" />
              <h3 className="text-3xl font-bold">1000+</h3>
              <p className="text-blue-100">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Departments />

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointment today and experience quality healthcare
          </p>
          <Link
            to="/appointment"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;