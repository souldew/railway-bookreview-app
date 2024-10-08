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
import { useCookies } from "react-cookie";

type Inputs = {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
};

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [_cookies, setCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [compressAvatar, setCompressAvatar] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    (async () => {
      // 新規登録
      try {
        const res = await axios.post(`${url}/users`, data);
        const token = res.data.token;
        console.log(compressAvatar?.size);
        // アイコンの処理
        if (avatarPreview) {
          await axios.post(
            `${url}/uploads`,
            {
              icon: compressAvatar,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      } catch (err) {
        setErrorMessage(`サインアップに失敗しました。 ${err}`);
      }
    })();
  };

  const makeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files![0];
    try {
      // 画像リサイズ
      new Compressor(rawFile, {
        quality: 0.1,
        maxWidth: 50,
        maxHeight: 50,
        success: (result: Blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setAvatarPreview(e.target?.result as string);
          };
          setCompressAvatar(
            new File([result], "compressed_image.jpg", { type: "image/jpeg" })
          );
          reader.readAsDataURL(result);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const validateImage = (files: FileList) => {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    if (files.length != 0) {
      if (!validImageTypes.includes(files[0].type)) {
        return "画像のみ許可されています";
      }
    }
    return true;
  };

  if (auth) return <Navigate to="/bookreview" />;

  return (
    <>
      <Header />
      <main>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            ユーザ名
            <br />
            <input
              type="text"
              {...register("name", {
                required: "ユーザ名は必須です",
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="name" />
          </div>
          <label>
            メールアドレス
            <br />
            <input
              type="email"
              aria-label="email"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="email" />
          </div>
          <label>
            パスワード
            <br />
            <input
              type="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 5,
                  message: "パスワードは5文字以上である必要があります",
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="password" />
          </div>
          <label>
            ユーザアイコン
            <br />
            <input
              type="file"
              accept="image/*"
              {...register("avatar", {
                validate: validateImage,
              })}
              onChange={makeAvatar}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="avatar" />
          </div>
          {avatarPreview && <img src={avatarPreview} className="mt-4" />}
          <button style={{ marginTop: "1rem" }}>登録</button>
        </form>
        <div style={{ marginTop: "3rem" }}>
          <Link to="/login">ログイン画面へ</Link>
        </div>
      </main>
    </>
  );
};
