import { cache } from 'react';
import 'server-only';

const getSocialMediaList = cache(async () => {
  console.log("✅ In getSocialMediaList function");

  try {
    const response = await fetch("https://www.reecosys.com/api/Admin/social_page/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
      },
      body: JSON.stringify({
        master_user_id: "373",
        logged_in_master_user_id: "373"
      })
    });

    const data = await response.json();
    if (data.success === 1) {
      return data.data;
    }

  } catch (error) {
    console.error("❌ SocialMediaList API call failed:", error);
    return {};
  }
});

export default getSocialMediaList;
