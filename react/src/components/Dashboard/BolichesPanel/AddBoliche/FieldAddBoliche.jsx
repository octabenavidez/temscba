export default function FieldAddBoliche({
    name,
    type,
    children,
    error,
    value,
}) {
    return (
        <div className="mb-5">
            <label
                htmlFor={name}
                className="mb-3 block text-base font-medium text-[#07074D]"
            >
                {children}
            </label>
            {name === "descripcion" ? (
                <textarea
                    rows="4"
                    name={name}
                    id={name}
                    placeholder={children}
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    defaultValue={value}
                ></textarea>
            ) : name === "imagen" ? (
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={children}
                    multiple
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={children}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    defaultValue={value}
                />
            )}
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
    );
}
