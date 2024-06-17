import { useEffect } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpLink from "./SignUpLink.jsx";
import GuestAccess from "./GuestAccess.jsx";

export default function Login() {
    useEffect(() => {
        document.body.style.backgroundImage =
            "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)";
        document.body.style.backgroundColor = "";
    }, []);

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginForm />

            <GuestAccess />

            <SignUpLink />
        </div>
    );
}
