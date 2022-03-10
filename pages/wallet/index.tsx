import { ReactElement } from "react"
import Layout from "../../components/layout/layout";

export default function Wallet() {
    return <h1>Wallet component</h1>
}

Wallet.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}
