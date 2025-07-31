import 'server-only'

const getBlogLatest = async () => {
  try {
    const response = await fetch(
      "https://www.reecosys.com/api/Services/blog/latest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093",
        },
        body: JSON.stringify({
          master_user_id: 339,
          logged_in_master_user_id: 339,
          page: 0,
          limit: 3,
          id: 717,
        }),
        cache: 'no-store',
      }
    );

    const data = await response.json();
    if (data.success === 1) {
      return data.data;
    }
  } catch (error) {
    console.error("❌ API call failed:", error);
    return {};
  }
};

export default getBlogLatest;
