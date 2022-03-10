import { ReactElement } from "react";
import Layout from "../../components/layout/layout";

export default function Explore() {
    return <h1>Explore Component</h1>
}

Explore.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}
