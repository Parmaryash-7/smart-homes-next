export async function POST(req) {
    const body = await req.json();
    const projectId = body.project_id || "";

    // console.log("project id is ", projectId);
    try {
        const response = await fetch("https://www.reecosys.com/api/Services/projects_units/unit_all_list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093",
            },
            body: JSON.stringify({
                project_id: projectId,
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

            const flatUnits = plotlist.flatMap(unit =>
                unit.floor_plans?.flatMap(plan =>
                    plan.unit_plans?.map(flat => ({
                        ...flat,
                        super_build_up_area_yard: (parseFloat(flat.super_built_up_area) * 0.111111).toFixed(2),
                        carpet_area_yard: (parseFloat(flat.carpet_area) * 0.111111).toFixed(2),
                    })) || []
                ) || []
            );

            return new Response(JSON.stringify(flatUnits), { status: 200 });
        }

        return new Response(JSON.stringify([]), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch plot list' }), { status: 500 });
    }
}
