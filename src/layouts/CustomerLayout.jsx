import React, { useState, useEffect, useRef } from "react";
import CustomerHeader from "../components/customer/CustomerHeader";
import CustomFooter from "../components/common/CustomFooter";
import FloatingMoveToTopBtn from "../components/common/FloatingMoveToTopBtn";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  const appBarRef = useRef(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div className="header" style={{ marginBottom: `${appBarHeight}px` }}>
        <CustomerHeader appBarRef={appBarRef} />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
      <div className="footer">
        <CustomFooter />
      </div>
      <FloatingMoveToTopBtn />
    </>
  );
}
