import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePassengerData, removeSeatData } from "../../../../../../stores/users/actions/UserAction";
import { setShowNextModdal } from "../../../../../../stores/users/actions/UserAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seatData = useSelector((state) => state.user_data.seatData);
  const passengerData = useSelector((state) => state.user_data.passengerData);

  useEffect(() => {
    dispatch(setShowNextModdal(false));
    props.closePassengerModal();
    displayRazorpay();
  }, []);
  // razor pay integration
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
      );
      return;
    }

    const paymentData = await axios.post("http://127.0.0.1:8000/api/payment/", {
      amount: seatData["seatData"]["totalPrice"],
    });

    const { amount, currency, order_id } = paymentData.data;

    const options = {
      key: "rzp_test_0byzGAVeUBt6CU", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Giyobus",
      description: "Travel",
      image: "",
      order_id: order_id,
      handler: async function (response) {
        const razorpay_paymentId = response.razorpay_payment_id;
        const razorpay_orderId = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;

        const res = await axios.post(
          "http://127.0.0.1:8000/api/verifySignature/",
          {
            razorpay_paymentId,
            razorpay_orderId,
            razorpay_signature,
          }
        );
        if (res.data.status === "Payment Successful") {
          seatData["seatData"]["booking_status"] = true;
          const data = {
            seat_data: seatData,
            passenger_data: passengerData,
            payment_data: paymentData.data,
          };

          dispatch(savePassengerData(data));
          dispatch(removeSeatData())
          navigate("/");
        } else {
          alert(res.data.status);
        }
      },
      prefill: {
        name: "John Doe",
        email: "doejon@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  //razorpay integration end
  return <></>;
};
