import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessRedirectPage from "./pages/SuccessRedirectPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import AuthLayout from "./layout/authlayout/AuthLayout";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostSearchPage from "./pages/PostSearchPage";
import CreatePostPage from "./pages/CreatePostPage";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import AllPostsPage from "./pages/AllPostsPage";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./layout/MainLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route path="/all-posts" element={<AllPostsPage />} />
            <Route path="/search" element={<PostSearchPage />} />
            <Route path="/success" element={<SuccessRedirectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<PublicProfilePage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
