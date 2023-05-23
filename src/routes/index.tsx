import {
  BrowserRouter
} from "react-router-dom";
import CustomRoutes from './customRoutes';
import { useEffect } from "react";

const Router = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
}

export default Router;
