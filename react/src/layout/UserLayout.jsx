import Logo from "../components/UI/Logo";

export default function UserLayout({ children, title }) {
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />

                <h2 className="mt-10 text-center text-2xl  font-bold text-white">
                    {title}
                </h2>
            </div>

            {children}
        </div>
    );
}
