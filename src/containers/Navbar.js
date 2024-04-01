import DarkLightBtn from "../components/DarkLightBtn";
import Logo from "../components/Logo";
import NavbarPages from "./NavbarPages";

export default function Navbar() {
  return (
    <div className="navbar d-flex flex-wrap justify-content-start align-items-center p-4 gap-md-4 gap-sm-4 gap-xs-4">
      <Logo />
      <NavbarPages />
      <DarkLightBtn />
    </div>
  );
}
