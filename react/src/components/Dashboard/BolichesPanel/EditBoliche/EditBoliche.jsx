import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BolicheForm from "../BolicheForm/BolicheForm.jsx";
import Loader from "../../Loader/Loader.jsx";
import { getBoliche } from "../../../../utils/getBoliche.js";

export default function EditBoliche() {
    const { id } = useParams();
    const [bolicheData, setBolicheData] = useState({});
    const [isFetching, setIsFetching] = useState([]);

    useEffect(() => {
        getBoliche(id, setIsFetching, setBolicheData);
    }, [id]);

    if (isFetching) {
        return <Loader />;
    }

    return (
        <BolicheForm
            formTitle="Editar Boliche"
            initialData={bolicheData}
            setBolicheData={setBolicheData}
        />
    );
}
