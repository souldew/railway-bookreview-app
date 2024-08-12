import { useState } from "react";
import { Header } from "../components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Compressor from "compressorjs";
import axios from "axios";
import { url } from "../const";
import { Link, useNavigate } from "react-router-dom";


type Inputs = {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
};

export const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [name, setName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setName(e.target.value);
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setPassword(e.target.value);
  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setEmail(e.target.value);

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password
    };
    
    (async () => {
      // 新規登録
      try {
        const res = await axios.post(`${url}/users`, data);
        const token = res.data.token;
        // アイコンの処理
        if (form.avatar.length != 0) {
          const data_icon: {iconUrl: null | File} = {
            iconUrl: null
          };
  
          console.log(form.avatar[0]);
  
          try {
            // 画像リサイズ
            new Compressor(form.avatar[0], {
              quality: 0.8,
              maxWidth: 100,
              maxHeight: 100,
              success: async (newFile: File) => {
                data_icon.iconUrl = newFile;
                await axios.post(`${url}/uploads`, {
                  "authorization": `Bearer ${token}`,
                  "icon": newFile
                });
              }
            })
          } catch(e) {
            console.log(e);
          }
        }
        navigate("/");
      } catch (err) {
        setErrorMessage(`サインアップに失敗しました。 ${err}`);
      }
      })();



    // ログインへ移動

  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: File | undefined = event.target.files?.[0];
  //   if (file) {
  //     const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  //     if (validImageTypes.includes(file.type)){
  //       try {
  //         // 画像リサイズ
  //         new Compressor(file, {
  //           quality: 0.8,
  //           maxWidth: 100,
  //           maxHeight: 100,
  //           success: (newFile: File) => {
  //             setValue("avatar", newFile);
  //             console.log("ok");
  //           }
  //         })
  //       } catch(e) {
  //         console.log(e);
  //       }
  //     }
  //   }
  // };

  const validateImage = (files: FileList) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    if (files.length != 0) {
      if (!validImageTypes.includes(files[0].type)){
        return "画像のみ許可されています"
      }
    }
    return true;
  }
  return (
    <>
    <Header />
    <main>
      <p style={{color: "red"}}>{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          ユーザ名
          <br />
          <input
            type="text"
            {...register("name", {
              required: "ユーザ名は必須です"
            })} />
        </label>
        <div style={{color: "red"}}><ErrorMessage errors={errors} name="name" /></div>
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
                message: 'メールアドレスの形式が不正です',
              },
            })}
          />
        </label>
        <div style={{color: "red"}}><ErrorMessage errors={errors} name="email" /></div>
        <label>
          パスワード
          <br />
          <input
            type="password"
            {...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 5,
                message: "パスワードは5文字以上である必要があります"
              }
            })} />
        </label>
        <div style={{color: "red"}}><ErrorMessage errors={errors} name="password" /></div>
        <label>
          ユーザアイコン
          <br />
          <input
            type="file"
            accept="image/*"
            {...register("avatar", {
              validate: validateImage
            })}
          />
        </label>
        <div style={{color: "red"}}><ErrorMessage errors={errors} name="avatar" /></div>
        <button style={{marginTop: "1rem"}}>登録</button>
      </form>
      <div style={{marginTop: "3rem"}}><Link to="/login">ログイン画面へ</Link></div>
    </main>
    </>
  );
};
