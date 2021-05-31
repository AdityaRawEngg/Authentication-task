import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// import store from "../../redux/store/store";
import { mount } from "enzyme";
import Login from "../../pages/Login";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let wrapper, props, store;

describe("Login component", () => {
  beforeEach(() => {
    const initialState = { user: {} };
    store = mockStore(initialState);
    props = { history: { push: jest.fn() }, login: jest.fn(), classes: {} };
    wrapper = mount(
      <Provider store={store}>
        <Login {...props} />
      </Provider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe("Has Component rendered", () => {
    it("Component is not empty renderer", () => {
      expect(wrapper.isEmptyRender()).toBe(false);
    });
    it("Component has child", () => {
      expect(wrapper.children().exists()).toBe(true);
    });
    it("Rendered Login from", () => {
      expect(wrapper.find("form").exists()).toBe(true);
    });
    it("Rendered Username input field", () => {
      expect(wrapper.find("input[name='email']").exists()).toBe(true);
    });
    it("Rendered password input feild", () => {
      expect(wrapper.find("input[name='password']").exists()).toBe(true);
    });
  });

  describe("Testing event handlers", () => {
    it("On Click Register button", () => {
      expect(wrapper.find("button").find("#register").exists()).toBe(true);
      wrapper.find("button").find("#register").simulate("click");
      expect(wrapper.children().props().history.push).toHaveBeenCalled();
    });
    it("On form Submit event handler", async () => {
      wrapper.find("form").simulate("submit", {
        target: { email: { value: "" }, password: { value: "" } },
      });
      expect(wrapper.children().props().login).toHaveBeenCalled();
    });
  });
});
