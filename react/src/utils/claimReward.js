import axiosClient from "../axios.js";

export const claimReward = async (id, handleSucess, handleError) => {
    try {
        const data = await axiosClient.post(`/rewards/claim-reward/${id}`);

        handleSucess(data);
    } catch (error) {
        handleError(error);
    }
};
