import {
    ClockIcon,
    MusicalNoteIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";

// Nav items
export function getNavigation(user) {
    let baseNavigation = [
        { name: "Boliches", to: "/boliches" },
        { name: "Recompensas", to: "/recompensas" },
        // { name: "¿Como usar Tems?", to: "/recompensas" },
    ];

    if (!user) {
        return [
            { name: "Iniciar Sesion", to: "/login" },
            { name: "Registrarse", to: "/signup" },
            ...baseNavigation,
        ];
    }

    if (user && user.role === "admin") {
        return [
            ...baseNavigation,
            { name: "Administrar Boliches", to: "/admin" },
        ];
    }

    // Si el usuario está autenticado pero no es un administrador, retorna solo el menú base
    return [...baseNavigation];
}

// Iconos pertenecientes a la seccion de mas detalles de boliches
export const SECTIONS_INFO = {
    horario: {
        Icon: ClockIcon,
    },
    tipo: {
        Icon: MusicalNoteIcon,
    },
    capacidad: {
        Icon: UserGroupIcon,
    },
};

// Menu items del administrador
export const MENU_ITEMS = [
    { title: "Gestionar Boliches", to: "/admin/boliches" },
    { title: "Gestionar Usuarios", to: "/admin/usuarios" },
    { title: "Gestionar Premios", to: "/admin/premios" },
];
