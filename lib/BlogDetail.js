import 'server-only'

const getBlogDetail = async () => {
    try {
        const response = await fetch("https://www.reecosys.com/api/Services/blog/list", {
            method: "POST",
            headers: {
                "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                is_active: 1,
                logged_in_master_user_id: 339,
                master_user_id: 339
            }),
            cache: 'no-store'
        });

        const data = await response.json();
        if (data.success == 1) {
            return data.data;
        }
    } catch (error) {
        console.error("❌ API call failed:", error);
        return {};
    }
};

export default getBlogDetail;
