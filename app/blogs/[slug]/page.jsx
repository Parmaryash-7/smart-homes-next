import Blog_detail from "components/Blog_detail";
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";
import getLatestBlogData from "lib/LatestBlogData";

export default async function BlogSlugPage({ params }) {
    const { slug } = params;

    const pageList = await getPageList();
    const blogs_types_list = await getBlogDetail();
    const recent_blog_init_data = await getLatestBlogData();

    return (
        <Blog_detail
            slug={slug}
            pageList={pageList}
            blogs_types_list={blogs_types_list}
            recent_blog_init_data={recent_blog_init_data}
        />
    );
}
