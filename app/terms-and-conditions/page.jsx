import Terms from "components/Terms";
import api from "lib/api.interceptor";

// import getPageList from "lib/PageList";

export default async function TermsPage() {
    // const pageList = await getPageList();
    const pageList = await api.PageList();

    return <Terms pageList={pageList} />;
}
