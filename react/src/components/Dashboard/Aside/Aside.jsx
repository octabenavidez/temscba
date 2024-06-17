import AsideButton from "./AsideButton.jsx";
import { MENU_ITEMS } from "../../../utils/data.js";

export default function Aside() {
    return (
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 ">
            <div className="border-b border-white/20">
                <h6 className="block antialiased text-center tracking-normal text-base font-semibold leading-relaxed text-white py-5">
                    Panel Tems
                </h6>
            </div>
            <div className="m-4">
                <ul className="flex flex-col gap-3">
                    {MENU_ITEMS.map(({ title, to }) => (
                        <li key={title}>
                            <AsideButton
                                link={to} // Pasa la ruta como prop
                            >
                                {title}
                            </AsideButton>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
