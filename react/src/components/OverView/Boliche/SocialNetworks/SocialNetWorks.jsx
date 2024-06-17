import Facebook from "../../../../assets/img/facebook.png";
import Instagram from "../../../../assets/img/instagram.png";

export default function SocialNetWorks({ linkFb, linkIg }) {
    return (
        <div className="mt-2 md:my-2 flex justify-center gap-3 md:gap-2">
            <a href={linkFb}>
                <img
                    src={Facebook}
                    alt="Icono de Facebook"
                    className="size-7 md:size-6"
                />
            </a>
            <a href={linkIg}>
                <img
                    src={Instagram}
                    alt="Icono de Instagram"
                    className="size-7 md:size-6"
                />
            </a>
        </div>
    );
}
