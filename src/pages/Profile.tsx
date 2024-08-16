import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import { url } from "../const";
import axios from "axios";
import { fetchUserInfo } from "../utils/util";

type Inputs = {
  name: string;
  avatar: FileList;
};

export const Profile = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const [cookies] = useCookies();
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [compressedInputFile, setCompressedInputFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    auth &&
      (async () => {
        const res = await fetchUserInfo(cookies["token"]);
        // 名前をセット
        setName(res.name);
        // アイコンをセット
        setAvatarPreview(res.iconUrl);
      })();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => {
    const data = {
      name: name,
    };

    (async () => {
      // 新規登録
      try {
        await axios.put(`${url}/users`, data, {
          headers: { Authorization: `Bearer ${cookies["token"]}` },
        });
        // アイコンの処理
        if (compressedInputFile) {
          console.log("update img size:", compressedInputFile?.size);
          await axios.post(
            `${url}/uploads`,
            {
              icon: compressedInputFile,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies["token"]}`,
              },
            }
          );
        }
        navigate("/bookreview");
      } catch (err) {
        setErrorMessage(`更新に失敗しました。 ${err}`);
      }
    })();
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

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            console.log(e.target?.result);
          };
          setCompressedInputFile(
            new File([result], rawFile.name, { type: "image/jpeg" })
          );
          reader.readAsDataURL(result);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h2 className="text-xl mb-2">ユーザ情報編集</h2>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            ユーザ名
            <br />
            <input
              value={name}
              type="text"
              {...register("name", {
                required: name === "" ? "ユーザ名は必須です" : false,
              })}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="name" />
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
              onChange={handleAvatar}
            />
          </label>
          <div style={{ color: "red" }}>
            <ErrorMessage errors={errors} name="avatar" />
          </div>
          {<img src={avatarPreview} className="mt-4 max-h-12 max-w-12 " />}
          <button style={{ marginTop: "1rem" }}>更新</button>
        </form>
      </main>
    </>
  );
};
