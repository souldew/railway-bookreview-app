import { useState } from "react";
import { Header } from "../components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Compressor from "compressorjs";
import axios from "axios";
import { url } from "../const";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RootState, signIn } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export const New = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cookies] = useCookies();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // サーバへsubmit
  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const data = {
      title: form.title,
      url: form.url,
      detail: form.detail,
      review: form.review,
    };
    (async () => {
      try {
        await axios.post(`${url}/books`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        navigate("/bookreview");
      } catch (err) {
        setErrorMessage(`書籍の新規登録に失敗しました。 ${err}`);
      }
    })();
  };

  return (
    <>
      <Header />
      <main>
        <h2 className="text-xl mb-2">書籍の新規作成</h2>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            タイトル
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
            URL
            <br />
            <input
              className="w-96"
              type="text"
              {...register("url", {
                required: "URLは必須です",
                pattern: {
                  value: /^(http:\/\/|https:\/\/)/,
                  message: "URLの形式が不正です",
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="url" />
          </div>
          <label>
            詳細
            <br />
            <textarea
              className="w-96 h-28"
              {...register("detail", { required: "詳細は必須です" })}
            ></textarea>
          </label>
          <div className="" style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="detail" />
          </div>
          <label>
            レビュー
            <br />
            <textarea
              className="w-96 h-28"
              {...register("review", { required: "レビューは必須です" })}
            ></textarea>
            <div style={{ color: "red" }}>
              <ErrorMessage errors={errors} name="review" />
            </div>
          </label>
          <button style={{ marginTop: "1rem" }}>登録</button>
        </form>
      </main>
    </>
  );
};
