export default function handleErrors(error, setErrors) {
    if (error.response && error.response.data.errors) {
        const errorFields = error.response.data.errors;

        const newErrors = {};
        Object.keys(errorFields).forEach((field) => {
            // Solo estamos usando el primer mensaje de error.
            newErrors[field] = errorFields[field][0];
        });

        setErrors(newErrors);
    } else if (error.response && error.response.data.message) {
        setErrors({ password: error.response.data.message });
    }
}
