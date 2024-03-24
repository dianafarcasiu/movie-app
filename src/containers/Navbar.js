import DarkLightBtn from "../components/DarkLightBtn";
import Logo from "../components/Logo";
import NavbarPages from "./NavbarPages";

export default function Navbar() {
  return (
    <div className="navbar d-flex flex-wrap justify-content-start align-items-center p-4 gap-md-5 gap-sm-2">
      <Logo />
      <NavbarPages />
      <DarkLightBtn />
    </div>
  );
}
