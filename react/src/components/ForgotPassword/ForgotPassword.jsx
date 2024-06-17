import { Link } from "react-router-dom";
import ForgotForm from "./ForgotForm";

export default function ForgotPassword() {
    return (
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <ForgotForm />

            <p className="mt-10 text-center text-[16px] text-black font-medium">
                ¿Recordaste tu contraseña?{" "}
                <Link
                    to="/login"
                    className="inline font-semibold leading-6 hover:text-gray-200 text-black text-center"
                >
                    Vuelve a loguearte
                </Link>
            </p>
            <p className="mt-3 text-center text-[14px] text-black font-medium text-nowrap">
                ¿No tienes cuenta?{" "}
                <Link
                    to="/signup"
                    className="inline font-semibold leading-6 hover:text-gray-200 text-black text-center"
                >
                    Registrate para mas beneficios
                </Link>
            </p>
        </div>
    );
}
