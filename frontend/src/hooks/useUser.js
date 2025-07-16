import { useAuth } from "../contexts/AuthContext";
import parseJwt from "../utility/parsejwt";

export const useUser = () => {
  const { token } = useAuth();
  const user = token ? parseJwt(token) : null;

  return {
    user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatar: user?.avatar,
    userName: user?.userName,
    email: user?.email,
  };
};
