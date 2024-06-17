import { useEffect, useState } from "react";
import getKeys from "../../../utils/getKeys";
import { getUserRewardClaims } from "../../../utils/getUserRewardClaims";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

export default function UsersPremios() {
    const [premiosReclamados, setPremiosReclamados] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    let premiosReclamadosKeys = [];
    const { id } = useParams();

    useEffect(() => {
        getUserRewardClaims(id, setIsFetching, setPremiosReclamados);
    }, [id]);


    if (premiosReclamados.length !== 0) {
        premiosReclamadosKeys = getKeys(premiosReclamados, [
            "updated_at",
            "id",
            "premio_id",
            "user_id",
            "user",
        ]);
    }

    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <div>
                    <div className="max-w-full overflow-x-scroll">
                        <h1 className="text-3xl font-bold">
                            Premios reclamados de{" "}
                            {premiosReclamados[0]?.user?.email}
                        </h1>
                        {premiosReclamados.length === 0 ? (
                            <div>
                                Todavía no hay premios reclamados por este
                                usuario
                            </div>
                        ) : (
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {premiosReclamadosKeys.map(
                                            (premioKey) => (
                                                <th
                                                    key={premioKey}
                                                    className="border-b border-blue-gray-50  py-5"
                                                >
                                                    <p className="block antialiased font-sans w-[135px] text-[11px] font-medium uppercase text-blue-gray-400">
                                                        {premioKey}
                                                    </p>
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {premiosReclamados.map((premio) => {
                                        return (
                                            <tr key={premio.id}>
                                                {premiosReclamadosKeys.map(
                                                    (key) => (
                                                        <td
                                                            className="border-b border-blue-gray-50 px-8 py-5"
                                                            key={key}
                                                        >
                                                            <p className="block antialiased text-sm font-medium text-blue-gray-600 whitespace-nowrap">
                                                                {key ===
                                                                "premio"
                                                                    ? premio[
                                                                            key
                                                                        ].nombre
                                                                    : premio[
                                                                            key
                                                                        ]}
                                                            </p>
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
