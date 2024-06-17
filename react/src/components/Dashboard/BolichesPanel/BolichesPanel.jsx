import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table from "./Table.jsx";
import Loader from "../Loader/Loader.jsx";
import ButtonAdd from "../../UI/ButtonAdd.jsx";
import { getBoliches } from "../../../utils/getBoliches.js";

export default function BolichesPanel() {
    const [boliches, setBoliches] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getBoliches(setIsFetching, (data) => {
            setBoliches(data.data.data);
        });
    }, []);
    
    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <div>
                    <>
                        <Link to="/admin/boliches/crear">
                            <ButtonAdd>Agregar Boliche</ButtonAdd>
                        </Link>

                        <Table boliches={boliches} setBoliches={setBoliches} />
                    </>
                </div>
            )}
        </>
    );
}
