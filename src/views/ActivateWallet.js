import React, { useState } from "react";
import CheckCircleOutlineSharpIcon from "@material-ui/icons/CheckCircleOutlineSharp";
import isMobilePhone from "validator/lib/isMobilePhone";
import io from "socket.io-client";

export default function ActivateWallet() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [verified, setVerifiy] = useState(false);
  const [phone, setPhone] = useState("");
  const [resend, setResend] = useState(false);
  const [response, setResponse] = useState({});
  const [unverified, setUnverified] = useState(false);
  const socket = io.connect(
    "https://prove-gateway-api-wjrnu3p4ya-uc.a.run.app"
  );

  const sendMessage = () => {
    if (isMobilePhone(phone, ["en-US"])) {
      setError(false);
      setSent(true);
      waitForResponse();
    } else {
      setError(true);
    }
  };

  function waitForResponse() {
    socket.emit("init_private_channel", { phone_number: phone });
    console.log("initialized");
  }

  socket.on("prove_validation", function (message) {
    console.log(message);
    if (message.status === "True") {
      setVerifiy(true);
    } else if (
      message.status === "False" &&
      message.description === "unsent "
    ) {
      setResend(true);
      console.log("error");
    } else {
      setUnverified(true);
      console.log("error");
    }
  });

  const errorText = (
    <span className="error">
      Please enter a valid U.S. mobile phone number.
    </span>
  );

  const resendText = resend ? (
    <span onClick={() => sendMessage()} className="link">
      Resend link
    </span>
  ) : (
    <div></div>
  );

  const sendLinkText = !sent ? (
    <span onClick={() => sendMessage()} className="link">
      Send secure link to verify phone
    </span>
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className="link black">
        (Tap secure link sent via SMS to activate)
      </span>
      {resendText}
    </div>
  );

  const unverifiedText = unverified ? (
    <span className="error">
      Something messed up here and someone will be with you shortly.
    </span>
  ) : (
    sendLinkText
  );

  const verifiedText = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <CheckCircleOutlineSharpIcon
        style={{ color: "green", marginRight: "10px" }}
      />
      <span className="link black" style={{ position: "relative", top: "50%" }}>
        Successfully verified!
      </span>
    </div>
  );

  return (
    <div>
      <div className="subtitle mb-25">
        <dt>Activate your Neon wallet</dt>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <input
          className="centered-input"
          placeholder="000-000-0000"
          value={phone.replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3")}
          maxLength={13}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
        />

        {verified ? verifiedText : unverifiedText}
        {resendText}
        {error ? errorText : null}
      </div>
      <div className="sub-container">
        <div className="row instructions_style"></div>
        <table
          style={{
            width: "100%",
            margin: "auto",
            fontSize: "14px",
            marginBottom: "50px",
            borderSpacing: "0px 25px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>
                <span>Jordans 11 Retro Size 10</span>
              </td>
              <td style={{ textAlign: "right", fontWeight: "bold" }}>
                <span>$298.00</span>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <span>Value of Nike stock you get</span>
              </td>
              <td
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                <span>$29.80</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <button
            className={verified ? "btn" : "btn-gray"}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Next
          </button>
          <span style={{ fontSize: "13px" }}>
            By clicking next, I agree to Neon's
            <span className="link"> terms</span>.
          </span>
        </div>
      </div>
    </div>
  );
}
