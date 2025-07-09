import AwardsDetail from "components/AwardsDetail";
import getPageList from "lib/PageList";
import getPropertyList from "lib/PropertList";
import { notFound } from "next/navigation";
import awardsData from "data/awards.json";


export default async function AwardsSlugPage({ params }) {
    const { slug } = params;

    // console.log("Slug from URL:", slug);

    const pageList = await getPageList();
    const propertylist = await getPropertyList();

    const matchedAward = awardsData.awards.find((a) => a.slug === slug);

    // console.log("Matched Award:", matchedAward);

    if (!matchedAward) return notFound();

    return (
        <AwardsDetail
            pageList={pageList}
            propertylist={propertylist}
            awardObj={matchedAward}
        />
    );
}
