import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Nav from "../components/OverView/Nav/Nav";
import Logo from "../components/UI/Logo";

export default function HomeLayout({ children }) {
    const { user, setUser, setUserToken } = useContext(UserContext);

    // console.log(user);

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#191F25";
    }, []);

    return (
        <>
            <div className="mx-auto sm:max-w-sm mt-10 mb-20 ">
                <Logo />
            </div>

            <Nav user={user} setUser={setUser} setUserToken={setUserToken} />

            <main className="max-w-5xl mx-auto md:flex md:gap-4">
                {children}
            </main>
        </>
    );
}
