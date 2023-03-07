import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({booking}) => {
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState(" ");
  const [transaction, setTransaction] = useState('')
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const {price, patient, email} = booking;

  useEffect(() => {
    
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({price})
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
      
  }, [price]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setCardError(error.message)
      } 
      setSuccess('')
      setProcessing(true)
      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patient,
              email: email
            },
          },
        },
      );

      if(confirmError){
        setCardError(confirmError.message)
        return;
      }
      if(paymentIntent.status === 'succeeded'){
      setSuccess('Congratulation! your payment completed.');
      setTransaction(paymentIntent.id)
      }

      setProcessing(false)
  };


 
  
  return (
      <> 
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#fff",
                "::placeholder": {
                  color: "#fff",
                },
              },
              invalid: {
                color: "#fff",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret || processing} className='btn btn-accent btn-sm mt-5'>
          Pay
        </button>
      </form>
     <p className="text-red-500 mt-3 font-bold">{cardError}</p>
     {
      success && <div>
        <p>{success}</p>
        <p>Your Transaction Id: {transaction}</p>
      </div>
     }
    </>
  );
};



export default CheckoutForm;
