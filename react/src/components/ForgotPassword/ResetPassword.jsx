import { useState } from "react";
import Field from "../UI/Field";
import PasswordIconToggle from "../UI/PasswordIconToggle";
import { passwordResetValidationSchema } from "../../utils/validationSchemas";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";
import { FIELDS_RESET } from "../../utils/data/fields_data";

export default function ResetPassword() {
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleSubmit, errors } = useForm(
        passwordResetValidationSchema,
        "/reset-password",
        () => {
            navigate("/login");
        }
    );

    return (
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {FIELDS_RESET.map(
                    ({ name, type, autoComplete, placeholder }) => (
                        <div className="mb-7" key={name}>
                            <div className="relative">
                                <Field
                                    id={name}
                                    name={name}
                                    type={
                                        (name === "password" && showPassword) ||
                                        (name === "password_confirmation" &&
                                            showConfirmPassword)
                                            ? "text"
                                            : type
                                    }
                                    autoComplete={autoComplete}
                                    placeholder={placeholder}
                                    error={errors[name]}
                                />

                                <PasswordIconToggle
                                    showPassword={
                                        (name === "password" && showPassword) ||
                                        (name === "password_confirmation" &&
                                            showConfirmPassword)
                                    }
                                    setShowPassword={
                                        name === "password"
                                            ? setShowPassword
                                            : setShowConfirmPassword
                                    }
                                />
                            </div>
                        </div>
                    )
                )}

                <div>
                    <input type="hidden" name="token" value={token} />
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Restablecer Contraseña
                    </button>
                </div>
            </form>
        </div>
    );
}
