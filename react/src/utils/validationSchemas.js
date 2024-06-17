import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("El email es inválido.")
        .required("El email es obligatorio."),
    password: Yup.string().required("La contraseña es obligatoria."),
});

export const signUpValidationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio."),
    email: Yup.string()
        .email("El email es inválido.")
        .required("El email es obligatorio."),
    password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .required("La contraseña es obligatoria."),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir.")
        .required("La confirmación de la contraseña es obligatoria."),
});

export const bolicheValidationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido."),
    precio: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("El precio es requerido."),
    tipo: Yup.string().required("El tipo es requerido."),
    descripcion: Yup.string().required("La descripción es requerida."),
    capacidad: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("La capacidad es requerida.")
        .min(1, "La capacidad debe ser al menos 1."),
    horario: Yup.string().required("El horario es requerido."),
    direccion: Yup.string().required("La dirección es requerida."),
    facebook: Yup.string()
        .required("El enlace de Facebook es requerido.")
        .url("El enlace de Facebook debe ser una URL válida."),
    instagram: Yup.string()
        .required("El enlace de Instagram es requerido.")
        .url("El enlace de Instagram debe ser una URL válida."),
    link_compra: Yup.string()
        .required("El enlace de compra es requerido.")
        .url("El enlace de compra debe ser una URL válida."),
    google_maps_iframe_src: Yup.string().required(
        "El enlace src de Google Maps es requerido."
    ),
    // "imagen[]": Yup.mixed().test(
    //     "file",
    //     "Debe cargarse al menos un archivo",
    //     (value) => value instanceof FileList && value.length > 0
    // ),
});

export const emailResetPasswordValidationSchema = Yup.object({
    email: Yup.string()
        .email("El email es inválido.")
        .required("El email es obligatorio."),
});

export const passwordResetValidationSchema = Yup.object({
    password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .required("La contraseña es obligatoria."),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir.")
        .required("La confirmación de la contraseña es obligatoria."),
});

export const changePointsValidationSchema = Yup.object({
    points: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Los puntos son requeridos."),
});

export const rewardValidationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del premio es requerido."),
    puntos: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Los puntos son requeridos."),
});

export const associateRewardValidationSchema = Yup.object({
    premios: Yup.array().required("Los premios son requeridos."),
});
