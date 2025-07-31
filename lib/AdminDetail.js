import { cache } from 'react'
import 'server-only'

const getAdminDetail = cache(async () => {
  try {
    const response = await fetch("https://www.reecosys.com/api/Admin/admin/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AuthorizationKey": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
      },
      body: JSON.stringify({
        user_name: "smarthomesinfrastructure"
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
});


export default getAdminDetail;
