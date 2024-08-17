import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";

export type Bookreview = {
  title: string;
  url: string;
  detail: string;
  review: string;
  isMine: boolean;
};

export const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies();
  const [bookreview, setBookreview] = useState<Bookreview>();

  useEffect(() => {
    (async () => {
      // ログの送信
      // awaitはいる？
      axios.post(
        `${url}/logs`,
        { selectBookId: `${id}` },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // 書籍情報の取得
      const response = await axios.get(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setBookreview(response.data);
      {console.log(bookreview?.isMine);}
    })();
  }, [id]);

  const handleButton = () => {
    navigate(`/edit/${id}`, {
      state: {bookreview: bookreview}
    });
  }

  return (
    <>
      <Header />
      <main>
        
        {bookreview ? (
          <>
            <div className="font-black text-lg">タイトル</div>
            <div className="mt-1 ml-4 mb-4">{bookreview.title}</div>
            <div className="font-black text-lg">URL</div>
            <div className="mt-1 ml-4 mb-4">{bookreview.url}</div>
            <div className="font-black text-lg">詳細</div>
            <div className="mt-1 ml-4 mb-4 w-3/5">{bookreview.detail}</div>
            <div className="font-black text-lg">レビュー</div>
            <div className="mt-1 ml-4 mb-4 w-4/5">{bookreview.review}</div>
            {bookreview.isMine ? (<div><button onClick={handleButton}>編集</button></div>): (<></>)}
          </>
        ) : (
          <div>Loading....</div>
        )}
      </main>
    </>
  );
};
