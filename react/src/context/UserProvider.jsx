import { useState } from "react";
import { UserContext } from "./UserContext.jsx";

export default function UserProvider({ children }) {
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("userToken" || "")
    );

    const [user, _setUser] = useState(
        JSON.parse(localStorage.getItem("user" || null))
    );

    const setUser = (data) => {
        if (data && data.data && data.data.user) {
            let user;

            if (data.data.user.is_admin === 1) {
                user = { data: data.data.user, role: "admin" };
            } else {
                user = { data: data.data.user, role: "autenticado" };
            }

            localStorage.setItem("user", JSON.stringify(user));
            _setUser(user);
        } else {
            localStorage.removeItem("user");
            _setUser(null);
        }

        // console.log(user);
    };

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("userToken", token);
        } else {
            localStorage.removeItem("userToken");
        }
        _setUserToken(token);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userToken,
                setUserToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
