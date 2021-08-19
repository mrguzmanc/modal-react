import React from "react";
import { render } from "@testing-library/react";
import ActivateWallet from "../views/ActivateWallet";
import userEvent from "@testing-library/user-event";

describe("When rendering the Activate your Neon wallet screen", () => {
  test("renders shows error when enterning an invalid phone number", async () => {
    const { findByPlaceholderText, findByText, getByText } = render(
      <ActivateWallet />
    );
    const input = await findByPlaceholderText(/000-000-0000/i);
    const secureLink = await findByText(/Send secure link to verify phone/i);

    await userEvent.type(input, "0123456998");
    await userEvent.click(secureLink);
    const alert = await getByText(
      /Please enter a valid U.S. mobile phone number./i
    );
    expect(alert).toBeInTheDocument();
  });
  test("renders shows Tap on SMS message when enterning a valid phone number", async () => {
    const { findByPlaceholderText, findByText, getByText } = render(
      <ActivateWallet />
    );
    const input = await findByPlaceholderText(/000-000-0000/i);
    const secureLink = await findByText(/Send secure link to verify phone/i);

    await userEvent.type(input, "9175468923");
    await userEvent.click(secureLink);
    const alert = await getByText(/Tap secure link sent via SMS to activate/i);
    expect(alert).toBeInTheDocument();
  });
});
