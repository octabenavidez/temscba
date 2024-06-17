import { Link } from "react-router-dom";

export default function CardBoliche({ boliches }) {
    const truncateDescription = (desc, limit = 25) => {
        if (desc.length > limit) {
            return desc.substring(0, limit) + "...";
        } else {
            return desc;
        }
    };

    return (
        <>
            {boliches.length > 0 &&
                boliches.map((boliche) => (
                    <div
                        key={boliche.id}
                        className="my-10 w-[230px] rounded-md text-white"
                    >
                        <Link to={`/boliches/${boliche.id}`}>
                            <div className="rounded-lg h-60 overflow-hidden">
                                <img
                                    alt={`Imagen del boliche ${boliche.nombre}`}
                                    className="object-cover object-center h-full w-full cursor-pointer"
                                    src={
                                        boliche.imagenes_boliche.length > 0
                                            ? `/assets/img_boliches/${boliche.imagenes_boliche[0].imagen}`
                                            : "https://dummyimage.com/1205x505"
                                    }
                                />
                            </div>
                        </Link>

                        <h2 className="text-2xl font-medium title-font text-white mt-5">
                            {boliche.nombre}
                        </h2>
                        <p className="text-base leading-relaxed mt-2">
                            {truncateDescription(boliche.descripcion)}
                        </p>

                        <Link
                            to={`/boliches/${boliche.id}`}
                            className="text-indigo-400 inline-flex items-center mt-3 cursor-pointer"
                        >
                            Mas Informacion
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                ))}
        </>
    );
}
