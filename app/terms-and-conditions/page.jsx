import Terms from "components/Terms";
import getPageList from "lib/PageList";

export default async function TermsPage() {
    const pageList = await getPageList();

    return <Terms pageList={pageList} />;
}
