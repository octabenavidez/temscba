import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { signUpValidationSchema } from "../../utils/validationSchemas.js";

import Field from "../UI/Field.jsx";
import PasswordIconToggle from "../UI/PasswordIconToggle.jsx";
import { useForm } from "../../hooks/useForm.jsx";
import { useNavigate } from "react-router-dom";
import { FIELDS_SIGNUP } from "../../utils/data/fields_data.js";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const { setUserToken, setUser } = useContext(UserContext);

    const { handleSubmit, errors } = useForm(
        signUpValidationSchema,
        "/signup",
        (data) => {
            setUser(data);
            setUserToken(data.data.access_token);
            navigate("/boliches");
        }
    );

    return (
        <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            noValidate
        >
            {FIELDS_SIGNUP.map(({ name, type, autoComplete, placeholder }) => (
                <div
                    key={name}
                    className={`mb-5 ${
                        (name === "password" ||
                            name === "password_confirmation") &&
                        "relative"
                    }`}
                >
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

                    {name === "password" && (
                        <PasswordIconToggle
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    )}

                    {name === "password_confirmation" && (
                        <PasswordIconToggle
                            showPassword={showConfirmPassword}
                            setShowPassword={setShowConfirmPassword}
                        />
                    )}
                </div>
            ))}

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
}
