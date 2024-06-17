import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../Loader/Loader.jsx";
import PremioForm from "../PremioForm/PremioForm.jsx";
import { getReward } from "../../../../utils/getReward.js";

export default function EditPremio() {
    const { id } = useParams();
    const [premioData, setPremioData] = useState({});
    const [isFetching, setIsFetching] = useState([]);

    useEffect(() => {
        getReward(id, setIsFetching, setPremioData);
    }, [id]);

    if (isFetching) {
        return <Loader />;
    }

    return <PremioForm formTitle="Editar Premio" initialData={premioData} />;
}
