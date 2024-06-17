import {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Search from "./Search.jsx";
import axiosClient from "../../../axios.js";
import { NavLink, useNavigate } from "react-router-dom";
import { getNavigation } from "../../../utils/data.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Nav({ user, setUser, setUserToken }) {
    const navigate = useNavigate();
    let navigation = getNavigation(user);

    function handleLogout() {
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setUserToken(null);
            navigate("/login");
        });
    }

    const allowedRoutes = ["/boliches"];

    return (
        <Disclosure as="nav" className="bg-[#14181C]">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 max-w-[1200px]">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                to={item.to}
                                                key={item.name}
                                                className={({ isActive }) =>
                                                    classNames(
                                                        isActive
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        "rounded-md px-3 py-2 text-sm font-medium"
                                                    )
                                                }
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                {allowedRoutes.includes(location.pathname) && (
                                    <div className="hidden md:block">
                                        <Search />
                                    </div>
                                )}
                                {user && user.role && (
                                    <>
                                        <div className="md:hidden ml-[3px]">
                                            <div className="flex items-end flex-col tracking-normal">
                                                <span className="text-white capitalize ">
                                                    {user.data.name}
                                                </span>
                                                <span className="text-gray-300 text-[12px] -mt-1">
                                                    {user.data.email}
                                                </span>
                                            </div>
                                        </div>
                                        <Menu
                                            as="div"
                                            className="relative ml-3"
                                        >
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <UserCircleIcon
                                                        className="size-8 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {/* <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 capitalize"
                                                                )}
                                                            >
                                                                a
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item> */}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                                onClick={
                                                                    handleLogout
                                                                }
                                                            >
                                                                Cerrar Sesion
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        <div className="hidden md:block ml-[3px]">
                                            <div className="flex flex-col tracking-normal">
                                                <span className="text-white capitalize ">
                                                    {user.data.name}
                                                </span>
                                                <span className="text-gray-300 text-[12px] -mt-1">
                                                    {user.data.email}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))} */}
                            {navigation.map((item) => (
                                <NavLink
                                    to={item.to}
                                    key={item.name}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block rounded-md px-3 py-2 text-sm font-medium"
                                        )
                                    }
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
