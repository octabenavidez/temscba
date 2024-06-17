import { Link, useNavigate } from "react-router-dom";

import FieldPremio from "./FieldPremio";
import ButtonSend from "../../../UI/ButtonSend";
import { useForm } from "../../../../hooks/useForm";
import { rewardValidationSchema } from "../../../../utils/validationSchemas";
import { FIELDS_PREMIOS } from "../../../../utils/data/fields_data";

export default function PremioForm({ formTitle, initialData }) {
    const navigate = useNavigate();

    const { handleSubmit, errors } = useForm(
        rewardValidationSchema,
        `/admin/rewards/${initialData ? initialData.id : ""}`,
        () => {
            navigate("/admin/premios");
        },
        initialData ? "put" : "post"
    );

    return (
        <div className="my-20 mx-10">
            <div className="flex justify-between">
                <h2 className="text-4xl mb-5">{formTitle}</h2>
                <div className="text-black flex">
                    <Link
                        className="flex items-center gap-1"
                        to="/admin/premios"
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
            <form
                className="space-y-6"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="grid grid-cols-2 gap-10">
                    {FIELDS_PREMIOS.map((field) => (
                        <FieldPremio
                            key={field.name}
                            {...field}
                            value={initialData?.[field.name] || ""}
                            error={errors[field.name]}
                        />
                    ))}
                </div>
                <ButtonSend>{initialData ? "Editar" : "Enviar"}</ButtonSend>
            </form>
        </div>
    );
}
