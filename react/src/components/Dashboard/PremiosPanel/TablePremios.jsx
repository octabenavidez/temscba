import { Link } from "react-router-dom";
import getKeys from "../../../utils/getKeys";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deletePremio } from "../../../utils/deletePremio";

export default function TablePremios({ premios, setPremios }) {
    let premiosKeys = getKeys(premios, ["id", "created_at", "updated_at"]);

    return (
        <div className="max-w-full overflow-x-scroll">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th>Acciones</th>
                        {premiosKeys.map((premioKey) => (
                            <th
                                key={premioKey}
                                className="border-b border-blue-gray-50  py-5"
                            >
                                <p className="block antialiased font-sans w-[135px] text-[11px] font-medium uppercase text-blue-gray-400">
                                    {premioKey}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {premios.map((premio) => {
                        return (
                            <tr key={premio.id}>
                                <td className="flex border-b border-blue-gray-50 px-8 py-5">
                                    <Link to={`/admin/premios/${premio.id}`}>
                                        <PencilSquareIcon className="size-6 cursor-pointer" />
                                    </Link>
                                    <TrashIcon
                                        className="size-6 cursor-pointer"
                                        onClick={() =>
                                            deletePremio(premio.id, setPremios)
                                        }
                                    />
                                </td>
                                {premiosKeys.map((key) => (
                                    <td
                                        className="border-b border-blue-gray-50 px-8 py-5"
                                        key={key}
                                    >
                                        <p className="block antialiased text-sm font-medium text-blue-gray-600 whitespace-nowrap">
                                            {premio[key]}
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
