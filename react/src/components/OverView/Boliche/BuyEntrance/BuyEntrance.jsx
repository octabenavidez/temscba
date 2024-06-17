export default function BuyEntrance({ link }) {
    return (
        <section className="bg-[#456] py-3 rounded-sm">
            <a
                href={link}
                className="text-[#bcd] hover:text-white block text-center text-sm "
            >
                Comprar Entrada
            </a>
        </section>
    );
}
