import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, update } from "../features/store";
import { BookreviewList } from "../components/BookreviewList";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Bookreview } from "./Detail";
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bookreview: Bookreview = useLocation().state.bookreview;
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");

  console.log(bookreview);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: bookreview.title,
      url: bookreview.url,
      detail: bookreview.detail,
      review: bookreview.review,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const data = {
      title: form.title,
      url: form.url,
      detail: form.detail,
      review: form.review,
    };

    (async () => {
      try {
        const response = await axios.put(`${url}/books/${id}`, data, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        navigate("/bookreview");
      } catch (err) {
        setErrorMessage(`レビューの更新に失敗しました。 ${err}`);
      }
    })();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      navigate("/bookreview");
    } catch (err) {
      setErrorMessage(`レビューの削除に失敗しました。 ${err}`);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h2 className="text-xl mb-2">レビューの編集</h2>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span className="font-black text-lg">タイトル</span>
            <br />
            <input
              className="w-96"
              type="text"
              {...register("title", {
                required: "タイトルは必須です",
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="title" />
          </div>

          <label>
            <span className="font-black text-lg">URL</span>
            <br />
            <input
              className="w-96"
              type="text"
              {...register("url", {
                required: "URLは必須です",
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="url" />
          </div>

          <label>
            <span className="font-black text-lg">詳細</span>
            <br />
            <textarea
              className="w-96 h-28"
              {...register("detail", {
                required: "詳細は必須です",
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="detail" />
          </div>

          <label>
            <span className="font-black text-lg">レビュー</span>
            <br />
            <textarea className="w-96 h-28" {...register("review", {
              required: "レビューは必須です"
            })} />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="review" />
          </div>
          <div className="flex gap-x-4">
            <button className="mt-4">更新</button>
            <button onClick={handleDelete} className="mt-4">
              削除
            </button>
          </div>
        </form>
      </main>
    </>
  );
};
