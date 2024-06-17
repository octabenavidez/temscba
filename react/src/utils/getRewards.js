import axiosClient from "../axios.js";

export const getRewards = async (setIsFetching, setRecompensas) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get("/rewards");

        setRecompensas(data.data.rewards);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
