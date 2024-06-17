import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import TableUsers from "./TableUsers.jsx";
import { getUsers } from "../../../utils/getUsers.js";
import Loader from "../Loader/Loader.jsx";
import ButtonSend from "../../UI/ButtonSend.jsx";

export default function UsersPanel() {
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const handleClickRecentRewards = async () => {
        Swal.fire({
            title: "Consultar Últimos Premios Reclamados",
            showCancelButton: true,
            confirmButtonText: "Consultar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const url = `http://localhost:8000/api/admin/users/rewards`;
                try {
                    const token = localStorage.getItem("userToken");

                    const response = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Response not OK");
                    }

                    const responseData = await response.json();

                    if (responseData.length === 0) {
                        throw new Error(
                            "No se han reclamado premios recientemente"
                        );
                    }

                    return responseData;
                } catch (error) {
                    Swal.showValidationMessage(`La solicitud falló: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                // Genera un string HTML con la tabla de premios
                const premiosHtml = result.value
                    .map((premio) => {
                        // Formatear la fecha
                        let date = new Date(premio.created_at);
                        let formattedDate = `${date.getDate()}-${
                            date.getMonth() + 1
                        }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

                        return `<tr"> 
                        <td class="px-6 py-3">${premio["user"]["name"]}</td>
                        <td class="px-6 py-3">${premio["user"]["email"]}</td>
                        <td class="px-6 py-3">${premio["premio"]["nombre"]}</td>
                        <td class="px-6 py-3">${premio.claim_code}</td>
                        <td class="px-6 py-3">${formattedDate}</td> 
                    </tr>`;
                    })
                    .join("");

                // Muestra un Swal con la tabla de premios
                Swal.fire({
                    title: "Premios reclamados recientemente",
                    html: `
                        <div class="flex justify-center">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3">Nombre</th>
                                        <th class="px-6 py-3">Email</th>
                                        <th class="px-6 py-3">Premio</th>
                                        <th class="px-6 py-3">Código de reclamación</th>
                                        <th class="px-6 py-3">Fecha de Reclamación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${premiosHtml}
                                </tbody>
                            </table>
                        </div>
                    `,
                    width: "70%",
                });
            }
        });
    };

    useEffect(() => {
        getUsers(setIsFetching, (data) => {
            setUsers(data.data);
        });
    }, []);

    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <>
                    <ButtonSend onClick={handleClickRecentRewards}>
                        Ver Ultimos Premios Reclamados
                    </ButtonSend>

                    <TableUsers users={users} setUsers={setUsers} />
                </>
            )}
        </>
    );
}
