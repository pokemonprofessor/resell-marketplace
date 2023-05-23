import Routes from "./routes";
import { Provider } from "react-redux";
import store from '../src/redux/store';

import './styles/common.css';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
