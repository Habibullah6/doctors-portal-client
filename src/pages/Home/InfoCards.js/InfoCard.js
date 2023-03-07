import React from "react";

const InfoCard = ({ data }) => {
  const { name, description, icon, bgClass } = data;
  return (
    <div className={`card card-side bg-base-100 shadow-xl p-4 text-white ${bgClass}`}>
    <figure>
        <img src={icon} alt=""/>
    </figure>
    <div className="card-body">
      <h2 className="card-title">{name}</h2>
      <p>{description}</p>
      
    </div>
  </div>
  );
};

export default InfoCard;
