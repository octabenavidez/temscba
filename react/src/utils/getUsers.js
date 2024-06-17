import axiosClient from "../axios.js";

export const getUsers = async (setIsFetching, handleSucess) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get("/admin/users");
        handleSucess(data.data);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
