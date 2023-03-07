import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "../InfoCards.js/InfoCard";
const InfoCards = () => {
  const cardData = [
    {
      id: 1,
      name: "Opening Hours",
      description: "Lorem Ipsum is simply dummy text of the pri",
      icon: clock,
      bgClass: "bg-gradient-to-r from-secondary to-primary",
    },

    {
      id: 2,
      name: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      icon: marker,
      bgClass: "bg-accent",
    },

    {
      id: 3,
      name: "Contact us now",
      description: "+8801920401053",
      icon: phone,
      bgClass: "bg-gradient-to-r from-secondary to-primary",
    },
  ];

  return (
  <section className="grid lg:grid-cols-3 gap-4">
   {
    cardData.map(data => <InfoCard key={data.id} data={data}></InfoCard>)
   }
  </section>
  );
};

export default InfoCards;
