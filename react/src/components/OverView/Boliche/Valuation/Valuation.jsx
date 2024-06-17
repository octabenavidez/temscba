import { useState, useContext } from "react";
import { UserContext } from "../../../../context/UserContext.jsx";
import Swal from "sweetalert2";
import { rateBoliche } from "../../../../utils/rateBoliche";
import { useParams } from "react-router-dom";
import StarsRating from "./StarsRating";
import { getUserRating } from "../../../../utils/getUserRating.js";

export default function Valuation({ total_valoraciones, num_valoraciones }) {
    const [averageRating, setAverageRating] = useState(
        total_valoraciones !== 0
            ? (total_valoraciones / num_valoraciones).toFixed(1)
            : "No hay puntaje aún"
    );

    const { user } = useContext(UserContext);

    const { id } = useParams();

    const handleStarClick = async (starNumber) => {
        if (!user) {
            Swal.fire(
                "Necesitas iniciar sesión para valorar este boliche",
                "",
                "warning"
            );
            return;
        }

        const userRating = await getUserRating(id); // Obtener el user rating

        if (userRating && userRating !== starNumber) {
            Swal.fire({
                title: `Ya has puntuado este boliche, tu puntaje cambiará a ${starNumber}, ¿Estás seguro?`,
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText: `Cancelar`,
                width: "600px",
            }).then((result) => {
                if (result.isConfirmed) {
                    rateBoliche(id, starNumber, setAverageRating);
                    Swal.fire("Tu puntaje fue enviado!", "", "success");
                }
            });
        } else if (userRating && userRating === starNumber) {
            Swal.fire({
                title: `Ya puntuaste previamente este boliche con un ${starNumber}`,
                width: "600px",
            });
        } else {
            // El usuario todavia no puntuo
            Swal.fire({
                title: `¿Puntuar este boliche con un ${starNumber} ?`,
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText: `Cancelar`,
                width: "600px",
            }).then((result) => {
                if (result.isConfirmed) {
                    rateBoliche(id, starNumber, setAverageRating);
                    Swal.fire("Tu puntaje fue enviado!", "", "success");
                }
            });
        }
    };

    return (
        <section className="mt-4 md:mt-8">
            <h2 className="uppercase tracking-wider text-sm text-[#99aabb] border-b-[1px] border-[#456] py-1">
                Valoracion
            </h2>
            <div className="flex flex-col mt-3 justify-center items-center">
                <span className="text-[#789] text-[20px] font-normal my-1">
                    {averageRating}
                </span>

                <StarsRating handleStarClick={handleStarClick} />
            </div>
        </section>
    );
}
