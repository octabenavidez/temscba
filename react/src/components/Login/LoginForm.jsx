import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { loginValidationSchema } from "../../utils/validationSchemas.js";

import Field from "../UI/Field.jsx";
import PasswordIconToggle from "../UI/PasswordIconToggle.jsx";
import { useForm } from "../../hooks/useForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FIELDS_LOGIN } from "../../utils/data/fields_data.js";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();

    const { handleSubmit, errors } = useForm(
        loginValidationSchema,
        "/login",
        (data) => {
            setUser(data);
            setUserToken(data.data.access_token);
            navigate("/");
        }
    );

    return (
        <form action="#" method="POST" onSubmit={handleSubmit} noValidate>
            {FIELDS_LOGIN.map((field) => (
                <div
                    className={`mb-5 ${
                        field.name === "password" && "relative"
                    }`}
                    key={field.name}
                >
                    <Field
                        id={field.name}
                        name={field.name}
                        type={
                            field.type === "password" && showPassword
                                ? "text"
                                : field.type
                        }
                        autoComplete={field.name}
                        placeholder={field.children}
                        error={errors[field.name]}
                    />
                    {field.type === "password" && (
                        <PasswordIconToggle
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    )}
                </div>
            ))}

            <div className="text-sm my-4 flex justify-between">
                <Link
                    to="/forgot-password"
                    className="font-semibold hover:text-indigo-400 text-white"
                >
                    Olvidaste tu contraseña?
                </Link>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
}
