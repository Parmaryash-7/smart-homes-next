import Blogs from "components/Blogs";
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";

export default async function BlogsPage() {
    const pageList = await getPageList();
    const blogDetailData = await getBlogDetail();

    return (
        <Blogs
            pageList={pageList}
            blogs_types_list={blogDetailData}
        />
    );
}
