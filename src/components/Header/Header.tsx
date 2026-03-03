"use client";
import "./Header.scss";
import { FC, useState } from "react";

import HeaderMain from "./HeaderMain/HeaderMain";
import useScrollDirectionClass from "@/hooks/useScrollDirectionClass";

// interface HeaderNavProps {
//   headerData: any;
//   socialData: any;
//   search: any[];
// }

export const headerData = {
  repeaterMain: []
};

const Header: FC = () => {
  // if (!headerData || !headerData?.section_check) return null;

  const statusScroll = useScrollDirectionClass();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [dropDownState, setDropDownState] = useState<string>("");

  return (
    <>
      <header className={`header header--${statusScroll} ${(dropDownState !== "" || openMenu !== false) && "header--active"}`}>
        <HeaderMain {...{ headerData, openMenu, setOpenMenu }} />
      </header>
      <div
        className="overlay"
        onClick={() => {
          setDropDownState("");
          setOpenMenu(false);
        }}
      />
    </>
  );
};

export default Header;
