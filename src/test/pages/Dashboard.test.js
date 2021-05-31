import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import ConfigureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// import store from "../../redux/store/store";
import Dashboard from "../../pages/Dashboard";

const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);
let wrapper, props, initialState, store;

describe("Dashboard ", () => {
  beforeEach(() => {
    document.cookie = "Token=someToken";
    const initialState = { user: {} };

    store = mockStore(initialState);
    props = props = {
      history: { push: jest.fn() },
      match: {},
      getUser: jest.fn().mockResolvedValue(),
      user: {},
    };
    wrapper = mount(<Dashboard store={store} {...props} />);
  });
  afterAll(() => {
    document.cookie = "Token=;path=/;max-age=-1";
  });
  describe("Has rendered", () => {
    it("Is not empty component", () => {
      expect(wrapper.isEmptyRender()).toBe(false);
    });
    it("Has user Details", () => {
      console.log(wrapper.children().debug());
      expect(wrapper.find("UserDetails").exists()).toBe(true);
    });
  });
});
