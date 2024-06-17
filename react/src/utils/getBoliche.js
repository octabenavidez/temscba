import axiosClient from "../axios.js";

export const getBoliche = async (id, setIsFetching, handleSucess) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get(`/boliches/${id}`);

        handleSucess(data.data.discoteca, data.data.discotecasAleatorias);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
