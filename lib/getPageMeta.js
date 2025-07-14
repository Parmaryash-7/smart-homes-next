export async function getPageMeta(slug) {
    try {
        const res = await fetch("https://www.reecosys.com/api/Admin/Services/pages/list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });

        const data = await res.json();
        if (data.success === 1) {
            const page = data.pages.find(p => p.slug === slug);
            return page || null;
        }
    } catch (err) {
        console.error("❌ getPageMeta failed", err);
    }
    return null;
}
