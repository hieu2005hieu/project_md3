import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguser = JSON.parse(localStorage.getItem("username"));

  return flaguser?.role === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
