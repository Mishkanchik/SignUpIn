import React from "react";
import { Routes, Route } from "react-router";

import HeaderComponent from "../Components/HeadersComponent/headers.jsx";
import { Box } from "@mui/material";

import Registration from "../Pages/RegistrationPages/Registration.jsx";
import Login from "../Pages/LoginPage/LoginPage.jsx";
import AdminPanel from "../Pages/AdminPanelPages/AdminPanelPages.jsx";







const RoutersComponents = () => {
 



  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route
          path="/"
          element={
            <Box
              sx={{
                backgroundColor: "#121212",
                color: "#fff",
                p: 3,
                width: "100vw",
                minHeight: "100vh",
              }}
            />
              
          }
        />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Registration />} />
        <Route path="/adminPanel" element={<AdminPanel/>} />
      </Routes>


    </>
  );
};

export default RoutersComponents;
