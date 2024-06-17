import axiosClient from "../axios.js";

export const getPointsAndRewards = async (
    setPoints,
    setRecompensas,
    setIsFetching
) => {
    setIsFetching(true);
    try {
        const [pointsResponse, recompensasResponse] = await Promise.all([
            axiosClient.get("/users/points"),
            axiosClient.get("/rewards"),
        ]);

        setPoints(pointsResponse.data.points);
        setRecompensas(recompensasResponse.data.rewards);
    } catch (error) {
        console.log(error);
    } finally {
        setIsFetching(false);
    }
};
