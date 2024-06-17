import axiosClient from "../axios.js";

export const getUserRating = async (id) => {
    try {
        const data = await axiosClient.get(`/boliches/${id}/user-valoration`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
