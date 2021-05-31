import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { act } from "react-dom/test-utils";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../axios";
import Signup from "../../pages/SignUp";

let wrapper;
let props;
let mock = new MockAdapter(axiosInstance);

describe("Sign up form", () => {
  props = {
    history: { push: jest.fn() },
    match: {},
  };

  beforeEach(() => {
    wrapper = mount(<Signup {...props} />);
  });
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("Has rendered", () => {
    it("Component", () => {
      expect(wrapper.isEmptyRender()).toBe(false);
    });
    it("form", () => {
      expect(wrapper.find("form").exists()).toBe(true);
    });
    it("initial Input field", () => {
      expect(wrapper.find("input[name='name']").exists()).toBe(true);
      expect(wrapper.find("input[name='email']").exists()).toBe(true);
      expect(wrapper.find("input[name='password']").exists()).toBe(true);
      expect(wrapper.find("input[name='phone']").exists()).toBe(true);
    });
    it("Sign up button", () => {
      expect(wrapper.find("button").find("#signupbtn").text()).toBe("Sign Up");
    });
    it("Already Have a account? login button", () => {
      expect(wrapper.find("button").find("#loginbtn").text()).toBe(
        "Already Have a account? login"
      );
    });
  });

  describe("Testing event listiners", () => {
    it("on Success Generate otp", async () => {
      mock.onPost("/user/register").replyOnce(200, { success: true });
      await act(async () => {
        wrapper.find("form").simulate("submit", {
          target: {
            name: { value: "" },
            email: { value: "" },
            phone: { value: "" },
            password: { value: "" },
          },
        });
      });
      wrapper.update();
      expect(wrapper.find("SignUpForm").props().isOtpGenerated).toBe(true);
      expect(wrapper.find('input[name="otp"]').exists()).toBe(true);
    });

    it("On failed Generated otp", async () => {
      mock.onPost("/user/register").replyOnce(403, { success: false });
      await act(async () => {
        wrapper.find("form").simulate("submit", {
          target: {
            name: { value: "" },
            email: { value: "" },
            phone: { value: "" },
            password: { value: "" },
          },
        });
      });
      wrapper.update();
      expect(wrapper.find("SignUpForm").props().isOtpGenerated).toBe(false);
      expect(wrapper.find('input[name="otp"]').exists()).toBe(false);
    });
    it("On Failure Signup", async () => {
      mock.onPost("/user/verifyRegister").replyOnce(403, { success: false });
      await act(async () => {
        wrapper.find("form").simulate("submit", {
          target: {
            name: { value: "" },
            email: { value: "" },
            phone: { value: "" },
            password: { value: "" },
            otp: { value: true },
          },
        });
      });
      wrapper.update();
      expect(wrapper.props().history.push).toBeCalledTimes(0);
    });
    it("On Success Signup", async () => {
      mock.onPost("/user/verifyRegister").replyOnce(200, { success: true });
      await act(async () => {
        wrapper.find("form").simulate("submit", {
          target: {
            name: { value: "" },
            email: { value: "" },
            phone: { value: "" },
            password: { value: "" },
            otp: { value: true },
          },
        });
      });
      wrapper.update();
      expect(wrapper.props().history.push).toBeCalled();
    });
    it("On Login click", () => {
      wrapper.find("button").find("#loginbtn").simulate("click");
      expect(wrapper.props().history.push).toHaveBeenCalled();
    });
  });
});
