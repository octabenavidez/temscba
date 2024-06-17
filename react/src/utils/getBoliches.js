import axiosClient from "../axios.js";

export const getBoliches = async (setIsFetching, handleSucess) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get("/boliches");
        handleSucess(data);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
