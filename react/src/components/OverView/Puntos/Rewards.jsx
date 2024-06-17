import Swal from "sweetalert2";
import { claimReward } from "../../../utils/claimReward";

export default function Rewards({ recompensas, setPoints }) {
    const handleRewardClaim = async (recompensaId) => {
        const result = await Swal.fire({
            title: "Consultar Boliches Asociados",
            showCancelButton: true,
            confirmButtonText: "Consultar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const url = `http://localhost:8000/api/rewards/${recompensaId}/boliches`;
                try {
                    const token = localStorage.getItem("userToken");

                    const response = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        Swal.showValidationMessage(`Error: ${response.status}`);
                    }
                    const resultData = await response.json();
                    if (resultData.discotecas.length === 0) {
                        return Swal.showValidationMessage(
                            "No hay boliches disponibles con este premio"
                        );
                    }
                    return resultData;
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },
        });

        if (result.isConfirmed) {
            const discotecas = result.value.discotecas;
            const result2 = await Swal.fire({
                title: "Reclama tu premio",
                input: "select",
                confirmButtonText: "Reclamar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                inputOptions: discotecas.reduce((object, discoteca) => {
                    object[discoteca.id] = discoteca.nombre;
                    return object;
                }, {}),
            });

            if (result2.isConfirmed) {
                claimReward(
                    recompensaId,
                    (data) => {
                        setPoints(data.data.remaining_points);
                        Swal.fire({
                            title: "Felicitaciones por reclamar tu premio!",
                            text: "En las próximas 24 hs se te enviará por email tu código, muchas gracias.",
                            icon: "success",
                            customClass: {
                                title: "title-class",
                                content: "my-content-class",
                            },
                        });
                    },
                    (error) => {
                        Swal.fire({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    }
                );
            }
        }
    };

    return (
        <div className="md:overflow-y-scroll px-4 md:max-h-[340px] ">
            {recompensas.map((recompensa) => (
                <div
                    key={recompensa.id}
                    className="flex w-[90%] mx-auto md:w-full justify-between gap-10 bg-gray-300 rounded-md py-5 px-4 md:px-10 my-3"
                >
                    <div className="flex-grow">
                        <div>
                            <p className="text-md md:text-xl font-bold ">
                                {recompensa.nombre}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col items-end ">
                            <button
                                onClick={() => handleRewardClaim(recompensa.id)}
                                className="overflow-hidden rounded bg-[#3A1E65] px-2 py-1 uppercase shadow transition-all active:shadow-md"
                            >
                                <p className="text-white transition-all group-active:scale-90">
                                    Canjear
                                </p>
                            </button>
                        </div>
                        <span className="font-bold text-nowrap">
                            {recompensa.puntos} Puntos
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
