import React from "react";
import bgImg from '../../../assets/images/bg.png';
import chair from '../../../assets/images/chair.png';
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";
const Banner = () => {
 const bannerBg ={
    background: `url(${bgImg})`,
    backgroundSize: '100% 100%'
 }
  return (
    <section className="hero lg:min-h-screen  p-5" style={bannerBg}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          className="lg:max-w-lg rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Your new smile starts here!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Banner;
