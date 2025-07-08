import { cache } from 'react';
import 'server-only';

const PageList = cache(async () => {
  try {
    const response = await fetch("https://www.reecosys.com/api/Admin/pages/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
      },
      body: JSON.stringify({
        logged_in_master_user_id: "339",
        master_user_id: "339",
        group_id: 617
      })
    });

    const data = await response.json();
    if (data.success == 1) {
      return data.data;
    }

  } catch (error) {
    console.error("❌ PageList API call failed:", error);
    return {};
  }
});

export default PageList;
