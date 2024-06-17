import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function PasswordIconToggle({ showPassword, setShowPassword }) {
    return (
        <button
            type="button"
            className="absolute right-1 top-[7px]"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? (
                <EyeIcon className="size-6 text-black" />
            ) : (
                <EyeSlashIcon className="size-6 text-black" />
            )}
        </button>
    );
}
