// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);

//   useEffect(() => {
//     if (authToken) {
//       localStorage.setItem("authToken", authToken);
//     } else {
//       localStorage.removeItem("authToken");
//     }
//   }, [authToken]);

//   return (
//     <AuthContext.Provider value={{ authToken, setAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
