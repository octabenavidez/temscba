import axios from "axios";
import router from "./router.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "userToken"
    )}`;

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            (error.response && error.response.status === 401) ||
            error.response.status === 403
        ) {
            router.navigate("/");
            return error;
        }
        throw error;
    }
);

export default axiosClient;
