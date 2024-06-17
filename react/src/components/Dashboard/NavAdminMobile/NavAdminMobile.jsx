import { useState } from "react";
import { MENU_ITEMS } from "../../../utils/data";
import { NavLink } from "react-router-dom";

export default function NavAdminMobile() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav>
            <section className="MOBILE-MENU flex justify-end lg:hidden w-[90%]">
                <div
                    className="HAMBURGER-ICON space-y-3 my-5"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                </div>

                <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                    <div
                        className="absolute top-0 right-0 px-8 py-8"
                        onClick={() => setIsNavOpen(false)}
                    >
                        <svg
                            className="h-8 w-8 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>

                    <ul className="flex flex-col items-center justify-between min-h-[250px]">
                        {MENU_ITEMS.map(({ title, to }) => (
                            <NavLink
                                key={title}
                                to={to}
                                className="border-b border-gray-400 my-8 uppercase"
                                onClick={() => setIsNavOpen(false)}
                            >
                                <p>{title}</p>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </section>
        </nav>
    );
}
