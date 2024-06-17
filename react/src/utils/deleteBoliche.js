import axiosClient from "../axios.js";

export const deleteBoliche = async (id, handleSucess) => {
    try {
        await axiosClient.delete(`/boliches/${id}`);

        handleSucess((prevBoliches) =>
            prevBoliches.filter((boliche) => boliche.id !== id)
        );
    } catch (error) {
        console.log(error);
    }
};
