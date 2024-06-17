import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import ListPremioBoliche from "./ListPremioBoliche";
import { getRewards } from "../../../../utils/getRewards";

export default function AddPremioBoliche() {
    const [premios, setPremios] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getRewards(setIsFetching, setPremios);
    }, []);

    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <div>
                    <>
                        <ListPremioBoliche premios={premios} />
                    </>
                </div>
            )}
        </>
    );
}
