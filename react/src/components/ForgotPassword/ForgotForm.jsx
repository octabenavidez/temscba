import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { emailResetPasswordValidationSchema } from "../../utils/validationSchemas";
import Field from "../UI/Field";

export default function ForgotForm() {
    const { handleSubmit, errors } = useForm(
        emailResetPasswordValidationSchema,
        "/forget-password",
        () => {
            Swal.fire({
                icon: "success",
                title: "Enlace de recuperacion enviado",
            });
        }
    );

    return (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
                <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    error={errors.email}
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Enviar enlace de acceso
                </button>
            </div>
        </form>
    );
}
