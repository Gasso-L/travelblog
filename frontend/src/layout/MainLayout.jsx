import CustomNavBar from "../components/navbar/CustomNavBar";
import { PostProvider } from "../contexts/PostContext";
import Footer from "../components/footer/Footer";
import { CommentProvider } from "../contexts/CommentContext";
import { AuthProvider } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { ProfileProvider } from "../contexts/ProfileContext";

const MainLayout = () => {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <PostProvider>
            <CommentProvider>
              <CustomNavBar />
              <main className="main-content">
                <Outlet />
              </main>
              <Footer />
            </CommentProvider>
          </PostProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
};

export default MainLayout;
