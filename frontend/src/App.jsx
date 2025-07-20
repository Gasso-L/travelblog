import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessRedirectPage from "./pages/SuccessRedirectPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostSearchPage from "./pages/PostSearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/authlayout/AuthLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import ContactPage from "./pages/ContactPage";
import PublicProfilePage from "./pages/PublicProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
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
