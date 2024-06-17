// Fields para loguearse
export const FIELDS_LOGIN = [
    {
        name: "email",
        type: "email",
        children: "Email",
    },
    {
        name: "password",
        type: "password",
        children: "Contraseña",
    },
];

// Fields para registrarse
export const FIELDS_SIGNUP = [
    {
        name: "nombre",
        type: "text",
        autoComplete: "nombre",
        placeholder: "Nombre",
    },
    {
        name: "email",
        type: "email",
        autoComplete: "email",
        placeholder: "Email",
    },
    {
        name: "password",
        type: "password",
        autoComplete: "current-password",
        placeholder: "Contraseña",
    },
    {
        name: "password_confirmation",
        type: "password",
        autoComplete: "current-password",
        placeholder: "Confirmar contraseña",
    },
];

// Fields para crear premios
export const FIELDS_PREMIOS = [
    {
        name: "nombre",
        type: "text",
        children: "Nombre",
    },
    {
        name: "puntos",
        type: "number",
        children: "Puntos",
    },
];

// Fields para restablecer contraseña
export const FIELDS_RESET = [
    {
        name: "password",
        type: "password",
        autoComplete: "current-password",
        placeholder: "Contraseña",
    },
    {
        name: "password_confirmation",
        type: "password",
        autoComplete: "current-password",
        placeholder: "Confirmar contraseña",
    },
];

// Fields para crear boliches
export const FIELDS_BOLICHES = [
    {
        name: "nombre",
        type: "text",
        children: "Nombre",
    },
    {
        name: "precio",
        type: "number",
        children: "Precio",
    },
    {
        name: "tipo",
        type: "text",
        children: "Tipo",
    },
    {
        name: "descripcion",
        type: "text",
        children: "Descripción",
    },
    {
        name: "capacidad",
        type: "number",
        children: "Capacidad",
    },
    {
        name: "horario",
        type: "text",
        children: "Horario",
    },
    {
        name: "direccion",
        type: "text",
        children: "Dirección",
    },
    {
        name: "facebook",
        type: "text",
        children: "Facebook",
    },
    {
        name: "instagram",
        type: "text",
        children: "Instagram",
    },
    {
        name: "link_compra",
        type: "text",
        children: "Enlace de compra",
    },
    {
        name: "imagen",
        type: "file",
        children: "Subir Imagenes",
    },
    {
        name: "google_maps_iframe_src",
        type: "text",
        children: "Agregar Maps",
    },
];
