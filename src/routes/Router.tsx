import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Bookreview } from "../pages/Bookreview";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Profile } from "../pages/Profile";
import { New } from "../pages/New";
import { Detail } from "../pages/Detail";
import { Edit } from "../pages/Edit";

export const Router = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookreview" element={<Bookreview />} />
        {auth ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<New />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Navigate to="/bookreview" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
