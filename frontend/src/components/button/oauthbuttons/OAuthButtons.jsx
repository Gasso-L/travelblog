import { Button } from "react-bootstrap";
import { BsGithub, BsGoogle } from "react-icons/bs";
import "./oauthbuttons.css";

const BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:9099";

const OAuthButtons = () => {
  return (
    <>
      <Button
        variant="outline-dark"
        className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
        href={`${BASE_URL}/github`}
      >
        <BsGithub size={20} />
        Continue with GitHub
      </Button>

      <Button
        variant="outline-primary"
        className="w-100 d-flex align-items-center justify-content-center gap-2"
        href={`${BASE_URL}/google`}
      >
        <BsGoogle size={20} />
        Continue with Google
      </Button>
    </>
  );
};

export default OAuthButtons;
