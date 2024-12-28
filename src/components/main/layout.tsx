import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export default function MainLayout() {
  return (
    <div className="bg-sky-200 min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
