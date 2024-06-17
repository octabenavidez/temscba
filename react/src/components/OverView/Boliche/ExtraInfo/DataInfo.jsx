export default function DataInfo({ data, icon }) {
    const Icon = icon;

    return (
        <div className="flex items-center gap-2">
            <Icon className="size-5 text-white" />

            <li className="text-[#7f5dae] flex flex-col text-md items-center">
                <span className="text-sm">{data}</span>
            </li>
        </div>
    );
}
