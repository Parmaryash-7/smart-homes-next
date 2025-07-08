import { cache } from 'react';
import 'server-only';

const getPropertyList = cache(async () => {
  try {
    const response = await fetch("https://www.reecosys.com/api/Services/properties/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
      },
      body: JSON.stringify({
        all_detail: "1",
        master_user_id: "339",
        logged_in_master_user_id: "339"
      })
    });

    const data = await response.json();
    if (data.success == 1) {
      return data.data;
    }

  } catch (error) {
    console.error("❌ PropertyList API call failed:", error);
    return {};
  }
});

export default getPropertyList;
