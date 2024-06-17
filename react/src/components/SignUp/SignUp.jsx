import { useEffect } from "react";
import LoginLink from "./LoginLink.jsx";
import SignUpForm from "./SignUpForm.jsx";

export default function SignUp() {
    useEffect(() => {
        document.body.style.backgroundImage =
            "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)";
        document.body.style.backgroundColor = "";
    }, []);

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <SignUpForm />

            <LoginLink />
        </div>
    );
}
