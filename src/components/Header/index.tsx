import logo from "assets/images/resell-logo-WHITE.png";
import { useNavigate } from "react-router";

import "./style.css";
import "styles/common.css";
import "styles/responsive-common.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="header-content-area">
          <div className="logo-wrap d-flex align-items-center">
            <a href="https://resell.ooo/" className="">
              <img style={{ zIndex: 100 }} src={logo} alt="Resell Brand Logo" />
            </a>
          </div>
          <div className="header-search mr-3 d-none d-lg-block">
            <div>
              <div className="form-group search-provider"></div>
            </div>
          </div>
          <div className="heder-right">
            <ul>
              <li>
                <button
                  onClick={() =>
                    navigate("/seller/onboarding/application-start")
                  }
                  className="btn btn-primary"
                >
                  Request <br /> to Sell
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/seller/signin")}
                  className="btn btn-primary"
                >
                  Seller <br /> Sign-In
                </button>
              </li>
            </ul>
            <div className="header-address">
              <p>
                154 West 14th St 
                <br />
                New York, NY 10011
                <br />
                <br />
                <span>seller@resell.ooo</span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
