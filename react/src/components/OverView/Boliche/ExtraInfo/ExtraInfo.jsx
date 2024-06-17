import DataInfo from "./DataInfo.jsx";
import { SECTIONS_INFO } from "../../../../utils/data.js";

export default function ExtraInfo({ boliche }) {
    return (
        <>
            <header>
                <ul className="flex flex-col md:flex-row gap-4 md:gap-6 uppercase">
                    <DataInfo
                        data={boliche.horario}
                        icon={SECTIONS_INFO.horario.Icon}
                    />
                    <DataInfo
                        data={boliche.tipo}
                        icon={SECTIONS_INFO.tipo.Icon}
                    />
                    <DataInfo
                        data={boliche.capacidad}
                        icon={SECTIONS_INFO.capacidad.Icon}
                    />
                </ul>
            </header>
        </>
    );
}
