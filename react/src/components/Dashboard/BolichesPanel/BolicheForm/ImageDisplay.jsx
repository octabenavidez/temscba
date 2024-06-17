import { XCircleIcon } from "@heroicons/react/24/solid";

function ImageDisplay({ images, onDelete, setBolicheData }) {
    return (
        <div>
            <p className="text-2xl mb-2">Imagenes Existentes</p>
            <div className="flex gap-2 flex-wrap">
                {images &&
                    images.map((imagen) => (
                        <div
                            key={imagen.id}
                            className="w-1/4 flex flex-col-reverse"
                        >
                            <img
                                src={`../../../assets/img_boliches/${imagen.imagen}`}
                                alt="Boliche"
                            />
                            <XCircleIcon
                                className="size-5 cursor-pointer"
                                onClick={() =>
                                    onDelete(imagen.id, setBolicheData)
                                }
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ImageDisplay;
