import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm.jsx";
import { useImage } from "../../../../hooks/useImage.jsx";

import { bolicheValidationSchema } from "../../../../utils/validationSchemas.js";
import ButtonSend from "../../../UI/ButtonSend.jsx";
import FieldAddBoliche from "../AddBoliche/FieldAddBoliche";
import ImageDisplay from "./ImageDisplay.jsx";
import { FIELDS_BOLICHES } from "../../../../utils/data/fields_data.js";

export default function BolicheForm({
    formTitle,
    initialData,
    setBolicheData,
}) {
    const { uploadImages, deleteImage } = useImage();
    const navigate = useNavigate();

    const { handleSubmit, errors } = useForm(
        bolicheValidationSchema,
        `/boliches/${initialData ? initialData.id : ""}`,
        async (response, imagenes) => {
            if (imagenes.length > 0) {
                const bolicheId = initialData
                    ? initialData["id"]
                    : response.data.id;
                await uploadImages(imagenes, bolicheId);
            }

            navigate("/admin/boliches");
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
            <form
                className="space-y-6"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="grid md:grid-cols-2 gap-10">
                    {FIELDS_BOLICHES.map((field) => (
                        <FieldAddBoliche
                            key={field.name}
                            {...field}
                            value={initialData?.[field.name] || ""}
                            error={errors[field.name]}
                        />
                    ))}
                    {formTitle === "Editar Boliche" && (
                        <ImageDisplay
                            images={initialData?.imagenes_boliche}
                            onDelete={deleteImage}
                            setBolicheData={setBolicheData}
                        />
                    )}
                </div>
                <ButtonSend>{initialData ? "Editar" : "Enviar"}</ButtonSend>
            </form>
        </div>
    );
}
