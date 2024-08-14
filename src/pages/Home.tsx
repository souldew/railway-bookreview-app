import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">login</Link>
      <br />
      <Link to="/bookreview">bookreview</Link>

    </>
  )
}