import { useEffect, useState } from "react";
import { getRewards } from "../../../utils/getRewards.js";

import Loader from "../Loader/Loader";
import TablePremios from "./TablePremios.jsx";
import ButtonAdd from "../../UI/ButtonAdd.jsx";
import { Link } from "react-router-dom";

export default function PremiosPanel() {
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
                        <Link to="/admin/premios/crear">
                            <ButtonAdd>Agregar Premio</ButtonAdd>
                        </Link>

                        <TablePremios
                            premios={premios}
                            setPremios={setPremios}
                        />
                    </>
                </div>
            )}
        </>
    );
}
