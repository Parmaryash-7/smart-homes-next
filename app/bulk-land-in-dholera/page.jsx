import Bulk_Land from "components/Bulk_Land";
// import getBulkLand from "lib/BulkLand"; 
import api from "lib/api.interceptor";



export default async function BulkLandPage() {
    // const bulkLandList = await getBulkLand();
    const bulkLandList = await api.BulkLand();

    return (
        <Bulk_Land projects_full_list_detail={bulkLandList[0]} />
    );
}
