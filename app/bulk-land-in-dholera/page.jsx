import Bulk_Land from "components/Bulk_Land";
import getBulkLand from "lib/BulkLand"; 

export default async function BulkLandPage() {
    const bulkLandList = await getBulkLand();

    return (
        <Bulk_Land projects_full_list_detail={bulkLandList[0]} />
    );
}
