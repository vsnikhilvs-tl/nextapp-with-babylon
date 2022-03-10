import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  let userInfo: FakeResponse;

  const [uname, setUName] = useState("");
  const [pwd, setPwd] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    console.log(uname, pwd);
    axios
      .get("https://randomuser.me/api/")
      .then((res: AxiosRequestConfig) => {
        userInfo = res.data.results[0];
        router.push("/home")
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Login to continue</h3>
        <input
          type="text"
          placeholder="Username"
          value={uname}
          onChange={(e) => {
            setUName(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        <br />
        <button value="button" onClick={handleSubmit}>
          Log In
        </button>
      </div>
    </div>
  );
}

interface FakeResponse {
  results: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: string;
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    phone: string;
    cell: string;
  };
  info: any;
}
