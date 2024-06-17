import { useState } from "react";
import axiosClient from "../axios.js";
import handleErrors from "../utils/errorHandler.js";

export const useForm = (
    validationSchema,
    requestUrl,
    handleSuccess,
    type = "post"
) => {
    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        let data = Object.fromEntries(fd);

        // Si hay checkboxes 'premios' en el form, los añadimos a los datos del formulario
        if (fd.has("premios")) {
            data = { ...data, premios: fd.getAll("premios") };
        }

        try {
            await validationSchema.validate(data, { abortEarly: false });

            setErrors({});

            try {
                const response = await axiosClient[type](requestUrl, data);

                // Si hay un campo de imágenes en el formulario, lo pasamos a la función handleSuccess
                if (e.target.imagen) {
                    handleSuccess(response, e.target.imagen.files);
                } else {
                    handleSuccess(response);
                }
            } catch (error) {
                // Aquí se manejan los errores de la solicitud axios
                handleErrors(error, setErrors);
            }
        } catch (error) {
            const newErrors = {};

            if (error.inner) {
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }

            setErrors(newErrors);
        }
    };

    return { handleSubmit, errors };
};
