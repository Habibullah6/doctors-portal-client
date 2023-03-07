import React from "react";
import quote from "../../../assets/icons/quote.svg";
import person1 from "../../../assets/images/people1.png";
import person2 from "../../../assets/images/people2.png";
import person3 from "../../../assets/images/people3.png";
import TestimonialCard from "./TestimonialCard";


const Testimonial = () => {


    const reviewData = [
        {
            id: 1,
            name: "Larry Smith",
            description:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: person1,
            location: "California"
        },
        {
            id: 2,
            name: "Justina Robert",
            description:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: person2,
            location: "California"
        },
        {
            id: 3,
            name: "Juliana Mike",
            description:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            img: person3,
            location: "California"
        }
    ];



    return (
        <div className="p-5">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl text-secondary font-bold">Testimonial</h1>
                    <h1 className="text-3xl">What Our Patients Says</h1>
                </div>

                <img src={quote} alt="" className="w-36" />
            </div>


            <div className="grid lg:grid-cols-3 gap-4">
                {
                reviewData.map(review => <TestimonialCard key={review.id} review={review}></TestimonialCard>)
                }
            </div>
        </div>
    );
};

export default Testimonial;
