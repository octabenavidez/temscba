import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { deleteBoliche } from "../../../utils/deleteBoliche.js";
import getKeys from "../../../utils/getKeys.js";

export default function Table({ boliches, setBoliches }) {
    let bolichesKeys = getKeys(boliches, ["id", "imagenes_boliche"]);

    return (
        <div className="max-w-full overflow-x-scroll">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th>Acciones</th>
                        <th>Premios</th>
                        {bolichesKeys.map((bolicheKey) => (
                            <th
                                key={bolicheKey}
                                className="border-b border-blue-gray-50  py-5"
                            >
                                <p className="block antialiased font-sans w-[135px] text-[11px] font-medium uppercase text-blue-gray-400">
                                    {bolicheKey}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {boliches.map((boliche) => {
                        return (
                            <tr key={boliche.id}>
                                <td className="px-8 py-5">
                                    <div className="flex">
                                        <Link
                                            to={`/admin/boliches/${boliche.id}`}
                                        >
                                            <PencilSquareIcon className="size-6 cursor-pointer" />
                                        </Link>
                                        <TrashIcon
                                            className="size-6 cursor-pointer"
                                            onClick={() =>
                                                deleteBoliche(
                                                    boliche.id,
                                                    setBoliches
                                                )
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <Link
                                        to={`/admin/boliches/${boliche.id}/premios`}
                                    >
                                        <PlusIcon className="size-6 cursor-pointer" />
                                    </Link>
                                </td>
                                {bolichesKeys.map((key) => (
                                    <td
                                        className="border-b border-blue-gray-50 px-8 py-5 "
                                        key={key}
                                    >
                                        {key == "instagram" ||
                                        key == "facebook" ||
                                        key == "link_compra" ? (
                                            <a
                                                href={boliche[key]}
                                                target="_blank"
                                            >
                                                {boliche[key]}
                                            </a>
                                        ) : (
                                            <p className="block antialiased text-sm font-medium text-blue-gray-600 w-44 overflow-auto">
                                                {boliche[key]}
                                            </p>
                                        )}
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
