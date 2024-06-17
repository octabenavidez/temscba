import { Link } from "react-router-dom";

export default function SignUpLink() {
    return (
        <p className="mt-10 text-center text-base text-black font-medium">
            Aún no tienes una cuenta?{" "}
            <Link
                to="/signup"
                className="block font-semibold leading-6 hover:text-gray-200 text-black text-center "
            >
                Registrate para mas beneficios
            </Link>
        </p>
    );
}
