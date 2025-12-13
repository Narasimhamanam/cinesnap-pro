import { createContext, useContext, useState, useEffect } from "react";

// provide default context shape so editor doesn't complain
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });

  // Load stored auth state on refresh
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setAuthState({
          user: parsed,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("AuthContext load error:", error);
    }
  }, []);

  // Login function
  const login = (userData, jwt) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);

    setAuthState({
      user: userData,
      isAuthenticated: true,
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  // detect admin user
  const isAdmin = authState.user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// clean hook version — no warnings
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
