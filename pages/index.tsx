import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import styles from "../styles/Home.module.css";
import Header from "./header";

export default function Home() {
  return <h1>Home component</h1>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
