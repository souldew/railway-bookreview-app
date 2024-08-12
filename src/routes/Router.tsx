import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "../pages/SignUp"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Bookreview } from "../pages/Bookreview"

export const Router = () => {
  // const auth = useSelector
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookreview" element={<Bookreview />} />
      </Routes>
    </BrowserRouter>
  )
}