import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ChatWidget from "../features/chat/components/ChatWidget";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Global floating chat — only renders when logged in */}
      <ChatWidget />
    </>
  );
};

export default MainLayout;