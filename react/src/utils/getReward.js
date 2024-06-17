import axiosClient from "../axios.js";

export const getReward = async (id, setIsFetching, handleSucess) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get(`/admin/rewards/${id}`);

        handleSucess(data.data);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
