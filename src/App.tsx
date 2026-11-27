import { useState } from "react";
import Header, { type PageKey } from "./Header.tsx";
import Footer from "./Footer.tsx";
import Calculate from "./Calculate.tsx";
import Contact from "./Contact.tsx";

function App() {
  const [activePage, setActivePage] = useState<PageKey>("home");

  return (
    <>
      <Header activePage={activePage} onNavigate={setActivePage} />

      {activePage === "home" && <Calculate />}
      {activePage === "contact" && <Contact />}

      {activePage === "about" && (
        <main className="calculator">
          <section className="calculator-section">
            <h2>About</h2>
            <p className="section-description">
              Solar System Calculator helps estimate panel count, battery bank
              capacity, inverter sizing, and MPPT charge controller ratings.
            </p>
          </section>
        </main>
      )}

      {activePage === "services" && (
        <main className="calculator">
          <section className="calculator-section">
            <h2>Services</h2>
            <p className="section-description">
              Custom solar load assessments, off-grid sizing guidance, and
              system planning.
            </p>
          </section>
        </main>
      )}

      <Footer />
    </>
  );
}

export default App;
