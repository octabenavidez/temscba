import { Link } from "react-router-dom";
import IconoIncognito from "../../assets/img/incognito.png";

export default function GuestAccess() {
    return (
        <div className="mt-3">
            <Link
                to="/boliches"
                className="flex w-full gap-2 justify-center rounded-md text-black bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-200"
            >
                <img
                    src={IconoIncognito}
                    alt="Icono de incognito"
                    className="h-6 rounded-full"
                />
                Entrar como invitado
            </Link>
        </div>
    );
}
