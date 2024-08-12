import { useEffect, useState } from "react";
import { Header } from "../components/Header";
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

export const Bookreview = () => {
  const [offset, setOffset] = useState<number>(0);
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${url}/public/books?offset=${offset}`);
        setBookList([...res.data]);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [offset]);

  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col gap-y-2">
          {bookList.length != 0 &&
            bookList.map((book) => {
              return (
                <div key={book.id} className="bg-blue-100 min-h-24 p-4">
                  {book.title}<br />
                  {book.review}
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};
