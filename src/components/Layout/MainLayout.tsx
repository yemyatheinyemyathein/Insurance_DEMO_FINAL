import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-16 transition-all duration-300 ease-linear">
          <div className="max-w-[100vw] overflow-hidden p-3 relative h-auto">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
