import React from 'react';

const Departments = () => {
  const departments = [
    {
      name: 'Cardiology',
      image: '/departments/cardio.jpg',
      description: 'Heart and cardiovascular care'
    },
    {
      name: 'Neurology',
      image: '/departments/neuro.jpg',
      description: 'Brain and nervous system treatment'
    },
    {
      name: 'Orthopedics',
      image: '/departments/ortho.jpg',
      description: 'Bone and joint specialists'
    },
    {
      name: 'Pediatrics',
      image: '/departments/pedia.jpg',
      description: 'Specialized care for children'
    },
    {
      name: 'Dermatology',
      image: '/departments/derma.jpg',
      description: 'Skin and hair treatment'
    },
    {
      name: 'Oncology',
      image: '/departments/onco.jpg',
      description: 'Cancer treatment and care'
    },
    {
      name: 'ENT',
      image: '/departments/ent.jpg',
      description: 'Ear, nose, and throat care'
    },
    {
      name: 'Radiology',
      image: '/departments/radio.jpg',
      description: 'Medical imaging services'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Departments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized medical departments with expert doctors and modern equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {dept.name}
                </h3>
                <p className="text-gray-600">
                  {dept.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;