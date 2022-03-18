import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "../../Context";
import "./SignInUp.css";
import { SIGNIN_UP } from "../../actions/ActionType";
import { signInUser, signUpUser, cookie } from "../../apiCall";
const CLOSE = require("../../assets/xmark-solid.svg");

export const SignInUp = () => {
  const [SiginInUp, setSiginInUp] = React.useState({
    siginInUp: "LOGIN",
    mobile: "",
    email: "",
    name: "",
    password: "",
  });

  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    setSiginInUp({...SiginInUp, siginInUp: state.signInUpAction})
  }, [state.signInUpEnabled, state.signInUpAction]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch({
      type: SIGNIN_UP,
      payload: {
        signInUpEnabled: open,
      },
    });
  };

  const handleSignInUp = () => {
    if (SiginInUp.siginInUp === 'LOGIN'){
      signInUser(SiginInUp).then(res => {
        if (res && res.data) {
          if (res.data.status) {
            cookie.set('Authorization', res.data.authToken);
            dispatch({
              type: SIGNIN_UP,
              payload: {
                signInUpEnabled: false,
              },
            });
          }
        }
      })
    }
    else if (SiginInUp.siginInUp === 'CONTINUE') {
      signUpUser(SiginInUp).then(res => {
        if (res && res.data) {
          if (res.data.status) {
            setSiginInUp({...SiginInUp, siginInUp: 'LOGIN'})
          }
        }
      })
    }
    
  }

  return (
    <div>
      <React.Fragment key={"right"}>
        <SwipeableDrawer
          anchor={"right"}
          open={state.signInUpEnabled}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ position: "relative", top: "100px" }}>
            <div style={{ width: "800px", marginLeft: "10%" }}>
              <img
                src={CLOSE.default}
                alt=""
                width={30}
                height={30}
                onClick={() => dispatch({
                  type: SIGNIN_UP,
                  payload: {
                    signInUpEnabled: false,
                  },
                })}
                style={{ cursor: "pointer" }}
              />
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h2>{SiginInUp.siginInUp === 'LOGIN' ? 'Login' : 'Sign Up'}</h2>
                    <div>
                      or <span className="signin-text" onClick={(e) => setSiginInUp({...SiginInUp, siginInUp: SiginInUp.siginInUp === 'LOGIN' ? 'CONTINUE' : 'LOGIN'})}>{SiginInUp.siginInUp === 'LOGIN' ? 'create an account' : 'login to your account'}</span>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                      alt=""
                      width={90}
                      height={90}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Phone Number"
                  style={{ padding: "20px", width: "50%" }}
                  value={SiginInUp.mobile}
                  onChange={(e) => setSiginInUp({...SiginInUp, mobile: e.target.value})}
                />
              </div>
              {SiginInUp.siginInUp === 'CONTINUE' ? 
              <>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Name"
                  style={{ padding: "20px", width: "50%" }}
                  value={SiginInUp.name}
                  onChange={(e) => setSiginInUp({...SiginInUp, name: e.target.value})}
                />
              </div>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                  style={{ padding: "20px", width: "50%" }}
                  value={SiginInUp.email}
                  onChange={(e) => setSiginInUp({...SiginInUp, email: e.target.value})}
                />
              </div>
              </>
              : null }
              <div>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Password"
                  style={{ padding: "20px", width: "50%" }}
                  value={SiginInUp.password}
                  onChange={(e) => setSiginInUp({...SiginInUp, password: e.target.value})}
                />
              </div>
              <div style={{ paddingTop: "10px" }}>
                <button
                  style={{
                    padding: "10px",
                    width: "50%",
                    color: "#ffffff",
                    backgroundColor: "#fc8019",
                    textTransform: "uppercase",
                  }}
                  onClick={handleSignInUp}
                >
                  {SiginInUp.siginInUp}
                </button>
              </div>

              <p className="privacy-text">
                By clicking on Login, I accept the Terms & Conditions & Privacy
                Policy
              </p>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
