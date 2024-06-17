export default function PuntosUser({ name, points }) {
    return (
        <div className="w-[90%] mx-auto md:h-[12em] md:w-[30em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]">
            <div>
                <h1 className="text-[2em] font-medium capitalize">
                    Bienvenido {name}!
                </h1>
                <p className="text-[0.85em]">Tienes {points} puntos</p>
            </div>
        </div>
    );
}
