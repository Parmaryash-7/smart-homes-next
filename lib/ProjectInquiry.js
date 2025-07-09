// import { cache } from 'react'
// import 'server-only'

// const projectInquiry = cache(async (data) => {
//     try {
//         const response = await fetch("https://www.reecosys.com/api/Services/inquiries/save", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
//             },
//             body: JSON.stringify(data)
//         });

//         const APIresponse = await response.json();
//         return APIresponse;

//     } catch (error) {
//         console.error("❌ API call failed:", error);
//         return {};
//     }
// });

// export default projectInquiry;


export async function projectInquiry(data) {
    try {
        const response = await fetch("https://www.reecosys.com/api/Services/inquiries/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("❌ projectInquiry error:", error);
        return {};
    }
}
