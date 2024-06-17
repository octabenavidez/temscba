import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonSend from "../../../UI/ButtonSend";
import { useForm } from "../../../../hooks/useForm";
import { associateRewardValidationSchema } from "../../../../utils/validationSchemas";

export default function ListPremioBoliche({ premios }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const { handleSubmit } = useForm(
        associateRewardValidationSchema,
        `/boliches/${id}/rewards`,
        () => {
            navigate("/admin/boliches");
        }
    );

    return (
        <div className="my-20 mx-10">
            <div className="flex justify-between">
                <h2 className="text-4xl mb-5">Listado de premios</h2>
                <div className="text-black flex">
                    <Link
                        className="flex items-center gap-1"
                        to="/admin/boliches"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000"
                            aria-hidden="true"
                            data-slot="icon"
                            className="size-4 cursor-pointer"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <p className="cursor-pointer">Volver</p>
                    </Link>
                </div>
            </div>
            <div className="max-w-full">
                <form
                    className="space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {premios.map((premio) => {
                        return (
                            <div
                                key={premio.id}
                                className="mt-4 flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    id={`premio-${premio.id}`}
                                    name="premios"
                                    value={premio.id}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <label
                                    htmlFor={`premio-${premio.id}`}
                                    className="ml-2 font-medium text-gray-700"
                                >
                                    {premio.nombre} ({premio.puntos} Puntos)
                                </label>
                            </div>
                        );
                    })}
                    <div className="mt-6">
                        <ButtonSend>Enviar</ButtonSend>
                    </div>
                </form>
            </div>
        </div>
    );
}
