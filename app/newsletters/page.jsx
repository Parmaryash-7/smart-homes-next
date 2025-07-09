import Newsletter from "components/Newsletter";
import getBlogDetail from "lib/BlogDetail";

export default async function NewsletterPage() {
    const blogDetailData = await getBlogDetail();

    return <Newsletter blogs_types_list={blogDetailData} />;
}
