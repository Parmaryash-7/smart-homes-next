import { cache } from 'react'
import 'server-only'

const getHomeDetail = cache(async () => {
  try {
    const response = await fetch("https://www.reecosys.com/api/Admin/home/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
      },
      body: JSON.stringify({
        master_user_id: "339",
        logged_in_master_user_id: "339"
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

export default getHomeDetail;
