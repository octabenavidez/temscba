import { Link } from "react-router-dom";

export default function LoginLink() {
    return (
        <p className="mt-10 text-center text-base text-black font-medium">
            Ya tienes cuenta?{" "}
            <Link
                to="/login"
                className="font-semibold leading-6 hover:text-gray-200 text-black text-center"
            >
                Vuelve a loguearte
            </Link>
        </p>
    );
}
