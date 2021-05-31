import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../axios";
import { apiCall } from "../../axios";

let mockAxios = new MockAdapter(axiosInstance);
let successResponse = { success: true };
let failResponse = { success: false, message: "Something went wrong" };
describe("Mock axios api call", () => {
  //   beforeEach(() => {});
  //   afterAll(() => {
  //     jest.clearAllMocks();
  //   });
  it("All POST call", () => {
    mockAxios
      .onPost("/user/register")
      .replyOnce(200, successResponse)
      .onPost("/user/register")
      .replyOnce(403, failResponse);
    apiCall({
      url: "/user/register",
      method: "POST",
      body: {},
    })
      .then((response) => {
        expect(response.data).toEqual(successResponse);
      })
      .catch((err) => {
        expect(err.response.data).toEqual(failResponse);
      });
  });
  it("All get Call", () => {
    mockAxios
      .onGet("/user/register")
      .replyOnce(200, successResponse)
      .onGet("/user/register")
      .replyOnce(403, failResponse);
    apiCall({
      url: "/user/register",
      method: "GET",
      body: {},
    })
      .then((response) => {
        expect(response.data).toEqual(successResponse);
      })
      .catch((err) => {
        expect(err.response.data).toEqual(failResponse);
      });
  });
});
