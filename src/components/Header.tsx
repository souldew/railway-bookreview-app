import { Link } from "react-router-dom";
import { blue_css, white_css } from "../const";

export const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: blue_css,
        color: white_css,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1><Link style={{color: "white"}} to="/">書籍管理</Link></h1>
    </header>
  );
};
