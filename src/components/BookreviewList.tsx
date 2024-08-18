import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import axios, { AxiosResponse } from "axios";
import { url } from "../const";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./BookreviewList.css";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine?: boolean;
};

export const BookreviewList = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState<Book[]>([]);
  const [cookies] = useCookies();
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  // Redux
  const offset = useSelector(
    (state: RootState) => state.bookreviewOffset.offset
  );
  useEffect(() => {
    (async () => {
      try {
        let res: AxiosResponse<Book[]>;
        if (auth) {
          // ログイン済み
          res = await axios.get(`${url}/books?offset=${offset}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
        } else {
          // 未ログイン
          res = await axios.get(`${url}/public/books?offset=${offset}`);
        }
        setBookList([...res.data]);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [offset]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, book: Book) => {
    e.preventDefault();
    navigate(`/edit/${book.id}`, {
      state: {bookreview: book}
    });
  }

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {bookList.length != 0 &&
          bookList.map((book) => {
            return (
                <Link 
                  to={`/detail/${book.id}`}
                  className={`flex justify-between min-h-26 p-2 text-gray-700
                    ${book?.isMine ? "bg-green-100" : "bg-blue-100"}`}
                  key={book.id}
                >
                  <div>
                    {book.title}
                    <br />
                    {book.detail}
                  </div>
                {book?.isMine ? (
                  <button 
                  className="bg-transparent text-gray-700 hover:bg-green-300 hover:border-none pointer-events-auto underline"
                  onClick={(e) => handleClick(e, book)}>
                    編集
                  </button>
                ) : (
                  <></>
                )}
                </Link>
              // </div>
            );
          })}
      </div>
    </>
  );
};
