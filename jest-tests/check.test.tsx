import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // toBeInTheDocumentの追加
import { SignUp } from "../src/pages/SignUp";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/features/store";

test("Station2 check", () => {
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </MemoryRouter>
  );
  // email入力欄
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  expect(emailInput).toBeInTheDocument();
  // password入力欄
  const passwordInput = container.querySelector("input[type='password']");
  expect(passwordInput).toBeInTheDocument();
  // button
  const submitInput = container.querySelector("button");
  expect(submitInput).toBeInTheDocument();
});
