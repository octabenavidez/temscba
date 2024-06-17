import Input from "./Input.jsx";

export default function Field({
    id,
    type,
    name,
    autoComplete,
    placeholder,
    error,
}) {
    return (
        <>
            <Input
                id={id}
                type={type}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </>
    );
}
