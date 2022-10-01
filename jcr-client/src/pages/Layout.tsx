import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <p>Navbar...</p>
      <Outlet />
    </>
  )
};

export default Layout;