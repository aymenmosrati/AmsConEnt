import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };
  const params = useParams();
  const curentUser = JSON.parse(localStorage.getItem("curentUser"));

  // console.log(params);
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <nav
          className={`${classes.header__content__nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""
            }`}
        >
          <ul>
            <li>
              <Link to="/profile/notifications" onClick={menuToggleHandler}>
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/profile/modifier" onClick={menuToggleHandler}>
                modifier votre profile
              </Link>
            </li>
            <li>
              <Link to="/profile/projets" onClick={menuToggleHandler}>
                projets
              </Link>
            </li>
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
