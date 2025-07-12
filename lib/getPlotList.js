import 'server-only';

const getPlotList = async (id) => {
    try {
        const response = await fetch("https://www.reecosys.com/api/Services/projects_units/unit_all_list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093",
            },
            body: JSON.stringify({
                project_id: id || "",
                logged_in_master_user_id: 339,
                master_user_id: 339,
                from_app: true,
                cp_user_id: "",
                search: "",
            }),
        });

        const data = await response.json();
        if (data.success === 1) {
            const plotlist = data.data;
            plotlist.forEach(unit =>
                unit.floor_plans?.forEach(plan =>
                    plan.unit_plans?.forEach(flat => {
                        flat.super_build_up_area_yard = (parseFloat(flat.super_built_up_area) * 0.111111).toFixed(2);
                        flat.carpet_area_yard = (parseFloat(flat.carpet_area) * 0.111111).toFixed(2);
                    })
                )
            );
            return plotlist.flatMap(unit => unit.floor_plans?.[0]?.unit_plans || []);
        }
        return [];
    } catch (error) {
        console.error("❌ Plot List Fetch Failed:", error);
        return [];
    }
};

export default getPlotList;
