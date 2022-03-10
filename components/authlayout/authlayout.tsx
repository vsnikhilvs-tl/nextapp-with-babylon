import Head from 'next/head'
import { ReactElement } from 'react'
import Header from '../../pages/header'

export default function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>AuthLayouts Example</title>
      </Head>
      <main>{children}</main>
    </>
  )
}
