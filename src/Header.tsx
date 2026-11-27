import "./Header.css";

export type PageKey = "home" | "about" | "services" | "contact";

interface HeaderProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

function Header({ activePage, onNavigate }: HeaderProps) {
  const handleSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: PageKey,
  ) => {
    event.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a
          href="#home"
          className="brand-title"
          onClick={(e) => handleSelect(e, "home")}
        >
          Solar System Calculator
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <ul className="nav-list">
            <li>
              <a
                href="#home"
                className={`nav-link ${activePage === "home" ? "is-active" : ""}`}
                aria-current={activePage === "home" ? "page" : undefined}
                onClick={(e) => handleSelect(e, "home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activePage === "about" ? "is-active" : ""}`}
                aria-current={activePage === "about" ? "page" : undefined}
                onClick={(e) => handleSelect(e, "about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={`nav-link ${activePage === "services" ? "is-active" : ""}`}
                aria-current={activePage === "services" ? "page" : undefined}
                onClick={(e) => handleSelect(e, "services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activePage === "contact" ? "is-active" : ""}`}
                aria-current={activePage === "contact" ? "page" : undefined}
                onClick={(e) => handleSelect(e, "contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
