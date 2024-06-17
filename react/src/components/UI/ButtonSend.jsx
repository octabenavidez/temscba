export default function ButtonSend({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            type="submit"
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-4 px-6 text-base font-semibold text-white outline-none w-full md:w-1/4"
        >
            {children}
        </button>
    );
}
