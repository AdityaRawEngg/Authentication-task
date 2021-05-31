import { act, fireEvent, render, screen } from "@testing-library/react";
import SignUp from "../../pages/SignUp";
import axiosInstance from "../../axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axiosInstance);
let wrapper, props;
beforeEach(() => {
  props = {
    history: { push: jest.fn() },
    match: {},
  };
  wrapper = render(<SignUp {...props} />);
});
afterEach(() => {
  mock.reset();
});
test("Has Component has rendered", () => {
  expect(wrapper.getByText("Name")).toBeInTheDocument();
  expect(wrapper.getByText("Email")).toBeInTheDocument();
  expect(wrapper.getByText("Password")).toBeInTheDocument();
  expect(wrapper.getByText("Phone")).toBeInTheDocument();
});
test("Generate OTP handler", async () => {
  mock.onPost("/user/register").replyOnce(200, { success: true });
  expect(screen.getByTestId("signup")).toBeInTheDocument();
  await act(async () => {
    fireEvent.submit(screen.getByTestId("signup"), {
      target: {
        name: { value: "" },
        email: { value: "" },
        phone: { value: "" },
        password: { value: "" },
      },
    });
  });
  expect(wrapper.queryByText("OTP")).toBeInTheDocument();
});

// test("Sign up handler", async () => {
//   mock.onPost("/user/verifyRegister").replyOnce(200, { success: true });
//   expect(screen.getByTestId("signup")).toBeInTheDocument();

//   fireEvent.submit(screen.getByTestId("signup"), {
//     target: {
//       name: { value: "" },
//       email: { value: "" },
//       phone: { value: "" },
//       password: { value: "" },
//       otp: { value: true },
//     },
//   });

//   expect(screen.getAllByText("Login")).toBeInTheDocument();
// });
