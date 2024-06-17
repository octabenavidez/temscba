import axiosClient from "../axios.js";

export const useImage = () => {
    const uploadImages = async (imagenes, bolicheId) => {
        if (imagenes.length > 0) {
            const fd = new FormData();
            fd.append("discoteca_id", bolicheId);

            for (let i = 0; i < imagenes.length; i++) {
                fd.append("imagen[]", imagenes[i]);
            }

            try {
                await axiosClient.post("/imagenes-boliches", fd);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteImage = async (id, setBolicheData) => {
        try {
            await axiosClient.delete(`/imagenes-boliches/${id}`);
            // Actualiza el estado para quitar la imagen eliminada
            setBolicheData((prevState) => ({
                ...prevState,
                imagenes_boliche: prevState.imagenes_boliche.filter(
                    (imagen) => imagen.id !== id
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    return { uploadImages, deleteImage };
};
