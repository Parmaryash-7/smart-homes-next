import Latestnews from "components/Latestnews";
import getBlogDetail from "lib/BlogDetail";

export default async function LatestNewsPage() {
    const blogDetailData = await getBlogDetail();

    return <Latestnews blogs_types_list={blogDetailData} />;
}
