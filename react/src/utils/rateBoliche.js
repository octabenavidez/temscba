import axiosClient from "../axios.js";

export const rateBoliche = async (id, valorationNumber, handleSucess) => {
    try {
        const data = await axiosClient.post(
            `/boliches/${id}/valoration/${valorationNumber}`
        );

        handleSucess(data.data.toFixed(1));
    } catch (error) {
        console.log(error);
    }
};
