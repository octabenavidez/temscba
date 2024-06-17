import axiosClient from "../axios.js";

export const getUserRewardClaims = async (
    id,
    setIsFetching,
    setPremiosReclamados
) => {
    setIsFetching(true);
    try {
        const data = await axiosClient.get(`/admin/users/${id}/rewards`);

        setPremiosReclamados(data.data);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
