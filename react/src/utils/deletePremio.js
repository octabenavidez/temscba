import axiosClient from "../axios.js";

export const deletePremio = async (id, handleSucess) => {
    try {
        await axiosClient.delete(`/admin/rewards/${id}`);

        handleSucess((prevPremios) =>
            prevPremios.filter((premio) => premio.id !== id)
        );
    } catch (error) {
        console.log(error);
    }
};
