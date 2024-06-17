import { Navigate, createBrowserRouter } from "react-router-dom";
import {
    AdminRoutePermision,
    ResetRoutePermision,
    UserRoutePermision,
} from "./utils/permisionRoutes.jsx";

import UserLayout from "./layout/UserLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import HomeLayout from "./layout/HomeLayout.jsx";

import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ForgotPassword/ResetPassword.jsx";

import Puntos from "./components/OverView/Puntos/Puntos.jsx";
import Boliches from "./components/OverView/Boliches/Boliches.jsx";
import Boliche from "./components/OverView/Boliche/Boliche.jsx";
import AddBoliche from "./components/Dashboard/BolichesPanel/AddBoliche/AddBoliche.jsx";
import EditBoliche from "./components/Dashboard/BolichesPanel/EditBoliche/EditBoliche.jsx";
import BolichesPanel from "./components/Dashboard/BolichesPanel/BolichesPanel.jsx";
import UsersPanel from "./components/Dashboard/UsersPanel/UsersPanel.jsx";
import PremiosPanel from "./components/Dashboard/PremiosPanel/PremiosPanel.jsx";
import AddPremio from "./components/Dashboard/PremiosPanel/AddPremio/AddPremio.jsx";
import EditPremio from "./components/Dashboard/PremiosPanel/EditPremio/EditPremio.jsx";
import AddPremioBoliche from "./components/Dashboard/BolichesPanel/AddPremioBoliche/AddPremioBoliche.jsx";
import UsersPremios from "./components/Dashboard/UsersPanel/UsersPremios.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <UserRoutePermision>
                <Navigate to="boliches" />,
            </UserRoutePermision>
        ),
        errorElement: <div>Page Not Found</div>,
    },
    {
        path: "/boliches",
        element: (
            <SearchProvider>
                <HomeLayout>
                    <Boliches />
                </HomeLayout>
            </SearchProvider>
        ),
    },
    {
        path: "/boliches/:id",
        element: (
            <HomeLayout>
                <Boliche />
            </HomeLayout>
        ),
    },
    {
        path: "/recompensas",
        element: (
            <UserRoutePermision>
                <HomeLayout>
                    <Puntos />
                </HomeLayout>
            </UserRoutePermision>
        ),
    },
    {
        path: "/login",
        element: (
            <UserLayout title="Iniciar sesión en su cuenta">
                <Login />
            </UserLayout>
        ),
    },
    {
        path: "/signup",
        element: (
            <UserLayout title="Crear cuenta">
                <SignUp />
            </UserLayout>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <UserLayout
                title={
                    <div className="flex flex-col items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#000"
                            className="size-12 mt-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>

                        <h2 className=" text-center text-2xl  font-bold text-white">
                            ¿Olvidaste tu contraseña?
                        </h2>
                    </div>
                }
            >
                <ForgotPassword />
            </UserLayout>
        ),
    },
    {
        path: "/reset-password",
        element: (
            <ResetRoutePermision>
                <UserLayout title="Restablecer contraseña">
                    <ResetPassword />
                </UserLayout>
            </ResetRoutePermision>
        ),
    },
    {
        path: "/admin",
        element: <Navigate to="/admin/boliches" />,
    },
    {
        path: "/admin/boliches",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <BolichesPanel />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/boliches/crear",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <AddBoliche />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/boliches/:id",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <EditBoliche />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/boliches/:id/premios",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <AddPremioBoliche />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/usuarios",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <UsersPanel />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/usuarios/:id/premios",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <UsersPremios />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/premios",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <PremiosPanel />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/premios/crear",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <AddPremio />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
    {
        path: "/admin/premios/:id",
        element: (
            <AdminRoutePermision>
                <AdminLayout>
                    <EditPremio />
                </AdminLayout>
            </AdminRoutePermision>
        ),
    },
]);

export default router;
