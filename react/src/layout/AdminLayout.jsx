import Aside from "../components/Dashboard/Aside/Aside";
import NavAdminMobile from "../components/Dashboard/NavAdminMobile/NavAdminMobile";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f9fafbf5]">
            <Aside />
            <NavAdminMobile />
            <div className="p-4 xl:ml-80">{children}</div>
        </div>
    );
}
