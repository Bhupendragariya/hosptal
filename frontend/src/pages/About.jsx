import React from 'react';
import { FaAward, FaUsers, FaHeart, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaHeart className="text-4xl text-blue-600" />,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and dignity'
    },
    {
      icon: <FaAward className="text-4xl text-blue-600" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in medical care and service'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: 'Safety First',
      description: 'Patient safety is our top priority in everything we do'
    },
    {
      icon: <FaUsers className="text-4xl text-blue-600" />,
      title: 'Teamwork',
      description: 'We work together to provide comprehensive healthcare solutions'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About MediCare
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dedicated to providing exceptional healthcare services with compassion, 
              innovation, and excellence for over two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At MediCare Hospital, our mission is to provide world-class healthcare 
                services that improve the quality of life for our patients and their families. 
                We are committed to delivering personalized, compassionate care using the 
                latest medical technologies and evidence-based practices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that healthcare is not just about treating illness, but about 
                promoting wellness, preventing disease, and supporting our community's 
                overall health and well-being.
              </p>
            </div>
            <div>
              <img
                src="/about.png"
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape the culture of our organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/whoweare.png"
                alt="Our History"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our History
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2000</h3>
                  <p className="text-gray-600">
                    MediCare Hospital was founded with a vision to provide accessible, 
                    high-quality healthcare to our community.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2010</h3>
                  <p className="text-gray-600">
                    Expanded our services with state-of-the-art medical equipment and 
                    specialized departments.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2020</h3>
                  <p className="text-gray-600">
                    Achieved recognition as a leading healthcare provider with over 
                    50 specialist doctors and modern facilities.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Today</h3>
                  <p className="text-gray-600">
                    Continuing to innovate and expand our services to meet the evolving 
                    healthcare needs of our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-blue-100">Expert Doctors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">10+</h3>
              <p className="text-blue-100">Specialized Departments</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-blue-100">Happy Patients</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-blue-100">Emergency Care</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;