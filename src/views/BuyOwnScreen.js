import React from "react";

export default function BuyOwnScreen({ setStep }) {
  return (
    <div>
      <div className="subtitle mb-25">
        <dt>Buy Nikes, own Nike</dt>
      </div>
      <div>
        <p className="txt-1 mb-25">
          <strong>StockX</strong> has linked with Neon to invite you to their
          exclusive money club. Neon’s priority is to help you save and grow
          your money, and we’re willing to <strong>pay you to do it.</strong>
        </p>
      </div>
      <div className="sub-container">
        <div className="row instructions_style">
          <div>
            <span className="step">1</span>
          </div>
          <span className="txt-1">
            Activate your new Neon wallet with your 
            <strong>phone number</strong>
          </span>
        </div>
        <div className="row instructions_style mb-25">
          <div>
            <span className="step">2</span>
          </div>
          <span className="txt-1">
            Get
            <strong> 10% in Nike Stock</strong> loaded in your Neon wallet after
            this purchase
          </span>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => setStep(1)}
            style={{ width: "100%" }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
