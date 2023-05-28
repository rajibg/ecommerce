import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
