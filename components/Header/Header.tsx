import "./style.css";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import Image from "next/image";
import logo from "@/public/static-images/logo.png";
import ButtonAuth from "../ButtonAuth/ButtonAuth";

const navLinks = [
  {
    label: "Товары",
    href: "/products",
  },
];

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo logo" href="/">
            <Image
              className="logo__image"
              src={logo}
              width={50}
              alt="fake store api logo"
            ></Image>
          </Link>
          <Navigation navLinks={navLinks} />
          <ButtonAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
