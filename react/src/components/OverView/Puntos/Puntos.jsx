import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext.jsx";

import PuntosUser from "./PuntosUser.jsx";
import Rewards from "./Rewards.jsx";
import { getPointsAndRewards } from "../../../utils/getPointsAndRewards.js";

export default function Puntos() {
    const { user } = useContext(UserContext);

    const [points, setPoints] = useState();
    const [recompensas, setRecompensas] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getPointsAndRewards(setPoints, setRecompensas, setIsFetching);
    }, [user]);

    return (
        <>
            {isFetching && (
                <div className="mx-auto h-[50vh] flex items-center justify-center">
                    <div className="loader-3"></div>
                </div>
            )}
            {!isFetching && (
                <div className="flex flex-col md:flex-row  justify-between gap-5 mt-10">
                    <PuntosUser name={user.data.name} points={points} />

                    <Rewards recompensas={recompensas} setPoints={setPoints} />
                </div>
            )}
        </>
    );
}
