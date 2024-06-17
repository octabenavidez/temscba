import {
    InformationCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { useForm } from "../../../hooks/useForm";
import { changePointsValidationSchema } from "../../../utils/validationSchemas";
import getKeys from "../../../utils/getKeys.js";
import { Link } from "react-router-dom";

export default function TableUsers({ users, setUsers }) {
    const [editingMail, setEditingEmail] = useState({});
    const pointsInputRef = useRef();
    let usersKeys = getKeys(users);
    const [searchTerm, setSearchTerm] = useState("");

    const handleEditClick = (email) => {
        setEditingEmail(email);
    };

    const { handleSubmit } = useForm(
        changePointsValidationSchema,
        "/admin/update-user-points",
        async (response) => {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.email === editingMail
                        ? { ...user, points: response.data.points }
                        : user
                )
            );

            setEditingEmail({});
        }
    );

    return (
        <div className="max-w-full overflow-x-scroll">
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Buscar por correo electrónico..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full rounded border"
                />
            </div>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {usersKeys.map((userKey) => (
                            <th
                                key={userKey}
                                className="border-b border-blue-gray-50  py-5"
                            >
                                <p className="block antialiased font-sans w-[135px] text-[11px] font-medium uppercase text-blue-gray-400">
                                    {userKey}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((user) => user.email.includes(searchTerm))
                        .map((user) => {
                            return (
                                <tr key={user.email}>
                                    {usersKeys.map((key) => (
                                        <td
                                            className="border-b border-blue-gray-50 px-8 py-5"
                                            key={key}
                                        >
                                            <div className="flex items-center gap-2 antialiased text-sm font-medium text-blue-gray-600 whitespace-nowrap">
                                                <>
                                                    {user[key]}
                                                    {key === "points" &&
                                                        editingMail !==
                                                            user.email && (
                                                            <PencilSquareIcon
                                                                className="size-6 cursor-pointer"
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        user.email
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    {key === "points" &&
                                                        editingMail ===
                                                            user.email && (
                                                            <form
                                                                onSubmit={
                                                                    handleSubmit
                                                                }
                                                            >
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    defaultValue={
                                                                        user.email
                                                                    }
                                                                    className="hidden"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    name="points"
                                                                    className="rounded-md mx-3"
                                                                    ref={
                                                                        pointsInputRef
                                                                    }
                                                                />
                                                                <button type="submit">
                                                                    Guardar
                                                                </button>
                                                            </form>
                                                        )}
                                                </>
                                            </div>
                                        </td>
                                    ))}

                                    <td>
                                        <Link
                                            to={`/admin/usuarios/${user.id}/premios`}
                                            className="flex gap-2"
                                        >
                                            <InformationCircleIcon className="size-6" />
                                            <p>Ver Premios</p>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
