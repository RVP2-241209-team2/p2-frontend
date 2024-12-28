import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export default function AuthLayout() {
  return (
    <div className="bg-rose-200 min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
