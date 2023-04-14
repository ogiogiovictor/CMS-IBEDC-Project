import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";

export const LoginLayout = () => <Outlet />;

export const AdminLayout = () => (
  <>
    <Header />
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  </>
);
