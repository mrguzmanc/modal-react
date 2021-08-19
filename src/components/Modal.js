import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyOwnScreen from "../views/BuyOwnScreen";
import ActivateWallet from "../views/ActivateWallet";
import axios from "axios";

export default function Modal() {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState({});
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    axios
      .get("https://core-api.joinneon.com/initiateNeon/")
      .then((response) => {
        setProduct(response);
      });
  }, []);

  return (
    <div>
      {step === 0 ? (
        <BuyOwnScreen setStep={setStep} />
      ) : step === 1 ? (
        <ActivateWallet setStep={setStep} />
      ) : null}
    </div>
  );
}
