import { Link, useNavigate } from "react-router-dom";
import { blue_css, white_css } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { RootState, signOut } from "../features/store";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../utils/util";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, _setCookies, removeCookies] = useCookies();
  const [name, setName] = useState<string>("");
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookies("token");
    navigate("/login");
  };

  useEffect(() => {
    auth &&
      (async () => {
        const res = await fetchUserInfo(cookies["token"]);
        setName(res.name);
      })();
  }, []);

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
      <h1>
        <Link className="hover:text-blue-200 text-white" to="/bookreview">
          書籍管理
        </Link>
      </h1>
      {auth ? (
        <div className="flex gap-x-8">
          <Link
            className="text-white hover:text-blue-200 my-auto "
            to="/profile"
          >
            {name}
          </Link>
          <button
            className="block my-auto ml-auto mr-4 border-none hover:text-blue-200"
            onClick={handleSignOut}
          >
            サインアウト
          </button>
        </div>
      ) : (
        <button
          className="my-auto mr-4 border-none hover:text-blue-200"
          onClick={() => navigate("/login")}
        >
          ログイン
        </button>
      )}
    </header>
  );
};
