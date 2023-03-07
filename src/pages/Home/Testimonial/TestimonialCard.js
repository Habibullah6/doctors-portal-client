import React from "react";

const TestimonialCard = ({ review }) => {
  const { name, description, img, location } = review;
  return (
    <div className="card mt-20 shadow-xl">
      <div className="card-body">
        <p>{description}</p>
        <div className="card-actions items-center mt-5">
          <img
            src={img}
            alt=""
            className="border-2 border-secondary rounded-full w-16"
          />
          <div>
            <h1 className="font-bold">{name}</h1>
            <h1>{location}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
