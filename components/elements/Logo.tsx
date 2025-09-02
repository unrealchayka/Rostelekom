import Link from "next/link";
import Image from "next/image";
const Logo = () => {
    return (
        <Link className="logo" href='/'>
            <Image className="logog_img" width={197} height={50} src='/img/logo.svg' alt="Rostelecom logo"/>
        </Link>
    );
}

export default Logo;
