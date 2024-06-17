

export default function ButtonAdd({ children }) {
    return (
        <button
            className="bg-blue-600 px-16 py-3 hover:bg-blue-500 my-10"
        >
            <p className="text-white">{children}</p>
        </button>
    );
}
