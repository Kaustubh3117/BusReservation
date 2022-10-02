import React, { useEffect, useState } from "react";
import Navbar from "../assets/NavigationBar";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

import {
  checkAuthenticated,
  load_user,
} from "../../../stores/accounts/actions/AuthActions";
import {
  setBoardingPointData,
  setDroppingPointData,
} from "../../../stores/users/actions/UserAction";

const Layout = ({
  checkAuthenticated,
  load_user,
  setBoardingPointData,
  setDroppingPointData,
  children,
}) => {
  const loading = useSelector((state) => state.common.loading);

  useEffect(() => {
    checkAuthenticated();
    load_user();
    setBoardingPointData();
    setDroppingPointData();
  }, []);

  return (
    <div className="">
      <div className={loading ? "loadingStyle" : ""}>
        {loading ? (
          <ReactLoading
            type="spin"
            color="#867EE5"
            height={40}
            width={40}
            className="z-1 top-50 left-50 fixed"
          />
        ) : null}
      </div>
      <>
        <Navbar /> {children}
      </>
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  load_user,
  setBoardingPointData,
  setDroppingPointData,
})(Layout);
