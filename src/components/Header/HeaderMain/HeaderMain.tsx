"use client";
import "./HeaderMain.scss";
import { FC, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import ButtonHamburguer from "@/components/Buttons/ButtonHamburguer/ButtonHamburguer";

interface HeaderMainProps {
  headerData: any;
  socialData?: any;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMain: FC<HeaderMainProps> = ({
  headerData,
  socialData,

  openMenu,
  setOpenMenu
}) => {
  if (!headerData) return null;
  const pathname = usePathname();

  const [sidebar, setSidebar, sidebarRef] = useClickOutside();

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollClose = () => {
      if (!!openMenu || !!sidebar) {
        setOpenMenu(false);

        setSidebar(false);
      }
    };
    window.addEventListener("scroll", handleScrollClose);
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [openMenu, sidebar, pathname]);

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      <div className="headerMain" ref={headerRef}>
        <div className={`headerMain__container ${openMenu && "headerMain__container--open"}`}>
          {/* Desktop */}
          <div className="headerMain__itemsContainer">
            {/* {!isMobile && ( */}
            <div className="headerMain__navContainer">
              {headerData?.repeaterMain &&
                headerData?.repeaterMain.map((item: any, a: number) => (
                  <div key={a + "headerMain__navButtonitem"} className={`headerMain__navButtonContainer`}>
                    {/* Items */}
                    <ButtonLink
                      variant="quaternary"
                      linkProps={{
                        url: item?.dropdown ? "#" : item?.link?.url,
                        title: item?.link?.title,
                        target: item?.dropdown ? "" : item?.link?.target,
                        name: item?.link?.title
                      }}
                    />
                  </div>
                ))}
            </div>

            <div className="headerMain__menuMobile">
              <ButtonHamburguer open={!!openMenu} onClick={handleSidebar} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`headerMain__navContainerMobile ${openMenu && sidebar && "headerMain__navContainerMobile--active"}`}
        ref={sidebarRef}
      >
        {headerData?.repeaterMain &&
          headerData?.repeaterMain.map((item: any, a: number) => (
            <div key={a} className={`headerMain__navButtonContainer`}>
              {/* Items */}
              <ButtonLink
                variant={"tertiary"}
                iconRight="chevron-right"
                linkProps={{
                  url: item?.dropdown ? "#" : item?.link?.url,
                  title: item?.link?.title,
                  target: item?.dropdown ? "" : item?.link?.target,
                  name: item?.link?.title
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default HeaderMain;
