const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const generateFormData = (json) => {
    const formData = new FormData();
    for (const key in json) {
        if (Object.prototype.hasOwnProperty.call(json, key)) {
            const value = json[key];
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        }
    }
    return formData;
};

const getToken = () => JSON.parse(sessionStorage.getItem("token"));
const getUserId = () => JSON.parse(sessionStorage.getItem("userId"));

const fetchDataWithToken = async (url, options = {}) => {
    try {
        const response = await fetch(BASE_URL + url, {
            ...options,
            headers: {
                ...options.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data with token:", error);
        return null;
    }
};

const fetchDataWithoutToken = async (url, options = {}) => {
    try {
        const response = await fetch(BASE_URL + url, {
            ...options,
            headers: {
                ...options.headers,
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data without token:", error);
        return null;
    }
};

export const fetchData = {
    get: async (url) => fetchDataWithToken(url),
    getWithoutToken: async (url) => fetchDataWithoutToken(url),

    post: async (url, data) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with POST request:", error);
            return null;
        }
    },

    postWithoutToken: async (url, data) => fetchData.post(url, data),

    patch: async (url, data) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with PATCH request:", error);
            return null;
        }
    },

    put: async (url, data) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with PUT request:", error);
            return null;
        }
    },

    putWithoutToken: async (url, data) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with PUT request:", error);
            return null;
        }
    },

    delete: async (url, body) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with DELETE request:", error);
            return null;
        }
    },

    deleteWithoutToken: async (url) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await response.json();
        } catch (error) {
            console.error("Error with DELETE request:", error);
            return null;
        }
    },

    postWithFormData: async (url, formData) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: generateFormData(formData),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with FormData POST:", error);
            return null;
        }
    },

    putWithFormData: async (url, formData) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: generateFormData(formData),
            });
            return await response.json();
        } catch (error) {
            console.error("Error with FormData PUT:", error);
            return null;
        }
    },

    postWithoutFormData: async (url, data) => fetchData.post(url, data),
};

// API Usage Wrapper
export const api = {
    getProjects: async () => {
        try {
            const res = await fetchData.post("/Services/project_list", {});
            return res?.success === 1 ? res.projects : [];
        } catch (err) {
            console.error("❌ getProjects error", err);
            return [];
        }
    },

    fetchProjectDetails: async (slug) => {
        const res = await fetchData.post("/Services/project_details", { slug });
        return res?.success === 1 ? res.project : null;
    },

    fetchAllProjectDetails: async (projects = []) => {
        const allDetails = [];
        for (const project of projects) {
            const detail = await api.fetchProjectDetails(project.slug);
            if (detail) allDetails.push(detail);
        }
        return allDetails;
    },

    fetchNewsList: async () => {
        const data = await fetchData.post(`/Services/news_list`, {});
        return data;
    },

    fetchSplashBanners: async () => {
        try {
            const res = await fetchData.post(`/Services/pages_list`, {});
            if (res?.success === 1) {
                const splashPage = res.pages.find((page) => page.slug === "splash");
                return splashPage?.media_list ?? null;
            }
            return null;
        } catch (error) {
            console.error("❌ fetchSplashBanners error:", error);
            return null;
        }
    },

    fetchStudioDescription: async () => {
        try {
            const res = await fetchData.post(`/Services/studio_list`, {});
            return res?.success === 1 && res.studio ? res.studio.description : null;
        } catch (error) {
            console.error("❌ fetchStudioDescription error:", error);
            return null;
        }
    },

    fetchTeamList: async () => {
        try {
            const res = await fetchData.post(`/Services/team_list`, {});
            return res?.success === 1 ? res.teams : [];
        } catch (error) {
            console.error("❌ fetchTeamList error:", error);
            return [];
        }
    },
};
