import { cache } from 'react'
import 'server-only'

const getBlogDetail = cache(async () => {
    try {
        const response = await fetch("https://www.reecosys.com/api/Services/blog/list", {
            method: "POST",
            headers: {
                "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
            },
            body: JSON.stringify({
                is_active: 1,
                logged_in_master_user_id: 339,
                master_user_id: 339
            })
        });

        const data = await response.json();
        if (data.success == 1) {
            return data.data;
        }

    } catch (error) {
        console.error("❌ API call failed:", error);
        return {};
    }
});

export default getBlogDetail;
