import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51MWyhHKZGjz6JdU65so7fxFbu5mNJlhRddQLryW9CckoPTvfFcxOtZJaoyKLqjgC5IQwVcP3Kf3IgnqV5ERAUhNU00O3PwM51u');
console.log(stripePromise);


const Payment = () => {
  const booking = useLoaderData();
  const { treatment, price, appointmentDate, slot } = booking;

  return (
    <div>
      <h1 className="text-xl font-bold">Pay for {treatment}</h1>
      <p>
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>

      <div className="my-10">
      <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} />
    </Elements>
      </div>
    </div>
  );
};

export default Payment;
