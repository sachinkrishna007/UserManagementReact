import { Container } from "react-bootstrap";
import { Outlet,useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
  const isAdminPage = location.pathname.startsWith("/admin");
  import AdminHeader from "./components/adminComponents/adminHeader";

const App = () => {
   const location = useLocation();
   const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage ? <AdminHeader /> : <Header />}
   
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
