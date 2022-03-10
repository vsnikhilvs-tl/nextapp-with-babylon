import Head from 'next/head'
import { ReactElement } from 'react'
import Header from '../../pages/header'

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <Header></Header>
      <main>{children}</main>
    </>
  )
}
