import { ReactElement } from "react";
import Layout from "../../components/layout/layout";

export default function Create() {
    return <h1>Create Component</h1>
}

Create.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}
