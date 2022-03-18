import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "../../Context";
import { ISSEARCH } from "../../actions/ActionType";
import { getLocations } from '../../apiCall';
const CLOSE = require("../../assets/xmark-solid.svg");

export const SideSearchBar = () => {
  const { state, dispatch } = React.useContext(Context);
  const [locations, setLocations] = React.useState([]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch({
      type: ISSEARCH,
      payload: {
        searchEnabled: open,
      },
    });
  };

  const handleLocationChange = (e) => {
    getLocations(e.target.value).then((res) => {
      if (res.data.status) {
        setLocations(res.data.locations);
      }
    });
  };

  const handleLocationSelect = (loc) => {
    localStorage.setItem(
      "location",
      loc.name.toUpperCase() +
        ", " +
        loc.district.toUpperCase() +
        ", " +
        loc.state.toUpperCase()
    );
    localStorage.setItem('locationId', loc._id);
    dispatch({
      type: ISSEARCH,
      payload: {
        searchEnabled: false,
      },
    });
  };

  return (
    <>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state.searchEnabled}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ position: "relative", top: "50px", width: "500px" }}>
            <div>
              <img
                src={CLOSE.default}
                alt=""
                width={30}
                height={30}
                style={{ float: "right", cursor: "pointer" }}
                onClick={() =>
                  dispatch({
                    type: ISSEARCH,
                    payload: {
                      searchEnabled: false,
                    },
                  })
                }
              />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for area, street name.."
              style={{ padding: "20px", width: "100%", marginTop: "20px" }}
              onChange={handleLocationChange}
            />
            <ul class="list-group">
              {locations.map((item) => (
                <li
                  class="list-group-item"
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => handleLocationSelect(item)}
                >
                  <div>
                    {item.name.toUpperCase() +
                      ", " +
                      item.district.toUpperCase()}
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    {item.state.toUpperCase()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
