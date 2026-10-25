"use client";

import { navLinks } from "./constants/NavLinks";
import StaggeredMenu from "./StaggeredMenu";

type NavbarProps = {
  onLoginClick: () => void;
};

const menuItems = navLinks.map(({ href, ...item }) => ({ ...item, link: href }));

function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <StaggeredMenu
      position="right"
      colors={["#B497CF", "#5227FF"]}
      items={menuItems}
      logoUrl="/Nova.svg"
      isFixed
      socialItems={[{ label: "GitHub", link: "https://github.com/Pachared/Nova-Cloud" }]}
      displaySocials
      displayItemNumbering
      menuButtonColor="#fff"
      openMenuButtonColor="#111"
      changeMenuColorOnOpen
      accentColor="#5227FF"
      closeOnClickAway
      onLoginClick={onLoginClick}
    />
  );
}

export default Navbar;
