import { useEffect, useState } from "react";

import SocialNetWorks from "./SocialNetworks/SocialNetWorks.jsx";
import ExtraInfo from "./ExtraInfo/ExtraInfo.jsx";
import BuyEntrance from "./BuyEntrance/BuyEntrance.jsx";
import Valuation from "./Valuation/Valuation.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { getBoliche } from "../../../utils/getBoliche.js";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import CardBoliche from "../Boliches/CardBoliche/CardBoliche.jsx";

export default function Boliche() {
    const [boliche, setBoliche] = useState(null);
    const [bolichesAleatorios, setBolichesAleatorios] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { id } = useParams();

    // console.log(boliche);

    const images = boliche?.imagenes_boliche.slice(1).map((image) => {
        return {
            original: `/assets/img_boliches/${image.imagen}`,
            thumbnail: `/assets/img_boliches/${image.imagen}`,
            originalHeight: "300px",
            originalWidth: "200px",
        };
    });

    useEffect(() => {
        getBoliche(id, setIsFetching, (bolicheData, bolichesAleatoriosData) => {
            setBoliche(bolicheData);
            setBolichesAleatorios(bolichesAleatoriosData);

            console.log("hola");
        });
    }, [id]);

    return (
        <>
            {isFetching && (
                <div className="mx-auto h-[50vh] flex items-center justify-center">
                    <div className="loader-3"></div>
                </div>
            )}
            {!isFetching && boliche && (
                <div>
                    <div className="text-white flex justify-end mr-10 my-10">
                        <Link
                            to="/boliches"
                            className="flex items-center gap-1"
                        >
                            <ArrowLeftIcon className="size-4 cursor-pointer" />

                            <p className="cursor-pointer">Volver</p>
                        </Link>
                    </div>

                    {/* Contedor principal de info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 w-[90%] md:w-full my-7 mx-auto">
                        {/* Contenedor de imagen y redes */}
                        <div className="order-2 mx-auto md:order-1 col-span-1 md:mr-[50px] flex flex-col ">
                            <img
                                className="h-full   md:w-[230px] md:h-[300px] aspect-video rounded-md object-cover"
                                src={
                                    boliche.imagenes_boliche.length > 0
                                        ? `/assets/img_boliches/${boliche.imagenes_boliche[0].imagen}`
                                        : "https://dummyimage.com/1205x505"
                                }
                                alt={`Imagen del boliche ${boliche.nombre}`}
                            />

                            <SocialNetWorks
                                linkFb={boliche.facebook}
                                linkIg={boliche.instagram}
                            />
                        </div>

                        <div className="order-1 md:order-2 col-span-1 md:col-span-3 flex gap-4">
                            {/* Contenedor de info */}

                            <div className="max-w-md flex flex-col gap-7 md:block">
                                <section className="flex flex-col md:flex-row md:items-end gap-1 md:gap-3">
                                    <h3 className="text-white text-3xl md:text-4xl">
                                        {boliche.nombre}
                                    </h3>
                                    <p className="text-[#99aabb] text-xs md:text-sm">
                                        {boliche.direccion}
                                    </p>
                                </section>

                                <div className="hidden md:block">
                                    <section className="my-8">
                                        <div>
                                            <p className="text-[#99aabb]">
                                                {boliche.descripcion}
                                            </p>
                                        </div>
                                    </section>
                                </div>

                                <ExtraInfo boliche={boliche} />

                                <div className="md:hidden">
                                    <BuyEntrance link={boliche.link_compra} />
                                </div>
                            </div>

                            {/* Contenedor de botones comprar y valoracion */}
                            <div className="w-[230px] mx-auto hidden md:block">
                                <BuyEntrance link={boliche.link_compra} />
                                <Valuation
                                    total_valoraciones={
                                        boliche.total_valoraciones
                                    }
                                    num_valoraciones={boliche.num_valoraciones}
                                />
                            </div>
                        </div>

                        {/* Contenedor descripcion y valoracion mobile */}
                        <div className="col-span-2 order-4 md:hidden">
                            <Valuation
                                total_valoraciones={boliche.total_valoraciones}
                                num_valoraciones={boliche.num_valoraciones}
                            />

                            <section className="mt-7">
                                <div>
                                    <p className="text-[#99aabb]">
                                        {boliche.descripcion}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Contenedor de imagenGallery y mapa */}
                    <div className="my-5 flex flex-col md:flex-row gap-3 md:mr-10">
                        <div className="w-[90%] mx-auto  md:w-1/2">
                            <ImageGallery
                                items={images}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={false}
                                showBullets={true}
                            />
                        </div>

                        <div className="w-[90%] h-[300px] md:h-auto mx-auto md:w-1/2">
                            <iframe
                                src={boliche.google_maps_iframe_src}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-center md:text-start text-4xl mt-14 text-white">
                            Quiza te interese...
                        </h2>

                        <div className="flex-col items-center md:flex-row flex gap-16 justify-center">
                            {bolichesAleatorios.length > 0 && (
                                <CardBoliche boliches={bolichesAleatorios} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
