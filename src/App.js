import React from "react";
import { Routes, Route } from "react-router-dom";
import DeleteAccount from "./Pages/DeleteAccount";
import ConfirmDeleteAccount from "./Pages/ConfirmDeleteAccount";

function App() {
  return (
    <Routes>
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="/confirm-delete-account/:token" element={<ConfirmDeleteAccount />} />
    </Routes>
  );
}

export default App;
