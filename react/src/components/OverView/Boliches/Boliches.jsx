import { useContext, useEffect, useState } from "react";
import CardBoliche from "./CardBoliche/CardBoliche.jsx";
import { getBoliches } from "../../../utils/getBoliches.js";
import { SearchContext } from "../../../context/SearchContext.jsx";
import Search from "../Nav/Search.jsx";

export default function Boliches() {
    const [boliches, setBoliches] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const { searchTerm } = useContext(SearchContext);

    useEffect(() => {
        getBoliches(setIsFetching, (data) => {
            setBoliches(data.data.data);
        });
    }, []);

    // Filtra los boliches basado en searchTerm
    const filteredBoliches = boliches.filter((boliche) =>
        boliche.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {isFetching && (
                <div className="mx-auto h-[50vh] flex items-center justify-center">
                    <div className="loader-3"></div>
                </div>
            )}
            {!isFetching && boliches.length > 0 && (
                <div className="mx-auto grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="w-full mt-10 md:hidden">
                        <Search />
                    </div>
                    <CardBoliche boliches={filteredBoliches} />
                </div>
            )}
        </>
    );
}
