import { useState } from "react";
import { Header } from "../components/Header";
import axios, { AxiosResponse } from "axios";
import { url } from "../const";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();
  
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setEmail(e.target.value);
  // const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setPassword(e.target.value);

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    (async () => {
      const data = {
        email: form.email,
        password: form.password
      };
      try {
        const res: AxiosResponse = await axios.post(`${url}/signin`, data);
        // setCookie("token", res.data.token);
        console.log(res);
        navigate("/bookreview");
      } catch (err) {
        setErrorMessage(`ログインに失敗しました。 ${err}`);
      }
    })();
  };

  return (
    <>
      <Header />
      <main>
        <p style={{display: "block", color: "red"}}>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            メールアドレス
            <br />
            <input
              type="text"
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
        
          <button style={{ marginTop: "1rem" }}>ログイン</button>
        </form>
        <div style={{marginTop: "3rem"}}><Link to="/signup">ユーザ作成画面へ</Link></div>
      </main>
    </>
  );
};
