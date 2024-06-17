import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function AsideButton({ children, link }) {

    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                `none font-bold transition-all text-sm py-3 px-4 rounded-lg shadow-md text-white w-full capitalize flex ${
                    isActive
                        ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                        : "hover:bg-white/10 active:bg-white/30"
                }`
            }
        >
            <Cog6ToothIcon className="size-5 mr-2" />
            {children}
        </NavLink>
    );
}
