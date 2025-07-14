import React from 'react';

const Card = ({ icon, title, description, infoimage }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      {infoimage && (
        <img
          src={infoimage}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
        <span className="material-symbols-rounded text-primary-600">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default Card;
