import React from 'react';
import { FaStethoscope, FaXRay, FaPills, FaAmbulance, FaHeartbeat, FaUserMd } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaStethoscope className="text-4xl text-blue-600" />,
      title: 'General Medicine',
      description: 'Comprehensive primary healthcare services for all ages'
    },
    {
      icon: <FaXRay className="text-4xl text-blue-600" />,
      title: 'Diagnostic Imaging',
      description: 'Advanced imaging services including X-ray, MRI, and CT scans'
    },
    {
      icon: <FaPills className="text-4xl text-blue-600" />,
      title: 'Pharmacy',
      description: '24/7 pharmacy services with all essential medications'
    },
    {
      icon: <FaAmbulance className="text-4xl text-blue-600" />,
      title: 'Emergency Care',
      description: 'Round-the-clock emergency medical services'
    },
    {
      icon: <FaHeartbeat className="text-4xl text-blue-600" />,
      title: 'Cardiology',
      description: 'Specialized heart care and cardiovascular treatments'
    },
    {
      icon: <FaUserMd className="text-4xl text-blue-600" />,
      title: 'Specialist Consultations',
      description: 'Expert consultations across multiple medical specialties'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive healthcare services with the latest technology 
            and experienced medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;