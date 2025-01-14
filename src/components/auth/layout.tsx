import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export default function AuthLayout() {
  return (
    <div className="bg-purple-200 min-h-screen flex flex-col gap-16">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
