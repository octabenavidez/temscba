import { useContext, useRef } from "react";
import { SearchContext } from "../../../context/SearchContext.jsx";

export default function Search() {
    const { setSearchTerm } = useContext(SearchContext); // Usa el contexto para obtener setSearchTerm
    const inputRef = useRef();

    const handleSearchClick = () => {
        const searchTerm = inputRef.current.value;
        setSearchTerm(searchTerm);
    };

    return (
        <div className="mx-5">
            <div className="relative flex items-center h-10 focus-within:shadow-lg rounded-xl border overflow-hidden ">
                <div
                    className="grid place-items-center h-full w-20 text-gray-500 bg-gray-300 cursor-pointer"
                    onClick={handleSearchClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <input
                    ref={inputRef}
                    className="h-full w-full border-0 text-sm text-gray-700 pr-2 ring-0 focus:ring-0"
                    type="text"
                    id="search"
                    placeholder="Busca cualquier boliche..."
                    onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                />
            </div>
        </div>
    );
}
