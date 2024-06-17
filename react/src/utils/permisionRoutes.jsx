import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosClient from "../axios";
import Loader from "../components/Dashboard/Loader/Loader";

function RedirectRoute({ children, checkValue, redirectRoute }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkValue) {
            navigate(redirectRoute);
        }
    }, [checkValue, navigate, redirectRoute]);

    if (!checkValue) return null;

    return children;
}

export function UserRoutePermision({ children }) {
    const { user } = useContext(UserContext);

    return (
        <RedirectRoute checkValue={user} redirectRoute="/login">
            {children}
        </RedirectRoute>
    );
}

export function ResetRoutePermision({ children }) {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get("token");

    return (
        <RedirectRoute checkValue={token} redirectRoute="/login">
            {children}
        </RedirectRoute>
    );
}
export function AdminRoutePermision({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#191F25";

        axiosClient
            .get("/check-auth")
            .catch((error) => {
                console.log(error);
                navigate("/login");
            })
            .finally(() => {
                // Añadimos un tempotizador para retardar la actualización de isLoading
                setIsLoading(false);
            });
    }, [navigate]);

    // Mientras se está cargando (verificando autenticación), mostrar una pantalla de carga.
    if (isLoading) {
        return <Loader />;
    }

    // Después de la carga y si el usuario está autenticado, renderizar children.
    return children;
}
