import React from "react";
import { render } from "@testing-library/react";
import BuyOwnScreen from "../views/BuyOwnScreen";
import userEvent from "@testing-library/user-event";

describe("When rendering Buy Nike, Own Nike screen", () => {
  const setStep = jest.fn();
  test("renders Buy Nikes, own Nike page when in /core/initiateNeon/:token page", async () => {
    const { findByText } = render(<BuyOwnScreen />);
    expect(await findByText(/Buy Nikes, own Nike/i)).toBeInTheDocument();
  });
  test("calls the setStep function when clicking the Continue button ", async () => {
    const { findByText } = render(<BuyOwnScreen setStep={setStep} />);
    const button = await findByText(/Continue/i);
    userEvent.click(button);
    expect(setStep).toHaveBeenCalled();
  });
});
