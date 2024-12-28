import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";

export default function AdminLayout() {
  return (
    <div className="bg-amber-200 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
