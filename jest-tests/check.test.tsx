import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // toBeInTheDocumentの追加
import App from './../src/App'

test("Station2 check", () => {
    const {container} = render(<App />);
    // email入力欄
    const emailInput = screen.getByRole("textbox", {name: /email/i});
    expect(emailInput).toBeInTheDocument();
    // password入力欄
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    // button
    const submitInput = container.querySelector("button");
    expect(submitInput).toBeInTheDocument();
});