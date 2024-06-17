export default function Input({ ...props }) {
    const className =
        "block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-[#9c80d4] focus:ring-0 placeholder-white ";

    // const className =
    //     "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ";

    return (
        <div className="mt-2">
            <input {...props} className={className} />
        </div>
    );
}
