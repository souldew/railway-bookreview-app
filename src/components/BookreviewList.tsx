import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/bookreviewSlice";
import axios from "axios";
import { url } from "../const";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
};

export const BookreviewList = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  // Redux
  const offset = useSelector(
    (state: RootState) => state.bookreviewOffset.offset
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${url}/public/books?offset=${offset}`);
        setBookList([...res.data]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [offset]);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {bookList.length != 0 &&
          bookList.map((book) => {
            return (
              <div key={book.id} className="bg-blue-100 min-h-26 p-2">
                {book.title}
                <br />
                {book.review}
              </div>
            );
          })}
      </div>
    </>
  );
};
