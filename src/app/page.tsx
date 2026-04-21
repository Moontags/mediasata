"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactiveEls = document.querySelectorAll("a, button, .service-card");
    const onEnter = () => { cursor.style.width = "20px"; cursor.style.height = "20px"; ring.style.width = "52px"; ring.style.height = "52px"; };
    const onLeave = () => { cursor.style.width = "10px"; cursor.style.height = "10px"; ring.style.width = "36px"; ring.style.height = "36px"; };
    interactiveEls.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    document.addEventListener("mousemove", onMouseMove);

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const onClick = (e: Event) => {
      e.preventDefault();
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };
    anchors.forEach((a) => a.addEventListener("click", onClick));

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
      anchors.forEach((a) => a.removeEventListener("click", onClick));
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      <nav>
        <a href="#" className="logo">Media<span>sata</span></a>
        <a href="#yhteys" className="nav-cta">Pyydä tarjous</a>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <h1 className="hero-title">Sivut jotka<br /><em>oikeasti</em><br />toimivat.</h1>
          <p className="hero-sub">Suunnittelemme ja toteutamme modernit, nopeat verkkosivut pk-yrityksille – selkeä hinta, ei turhaa monimutkaisuutta.</p>
          <div className="hero-actions">
            <a href="#yhteys" className="btn-primary">Ota yhteyttä</a>
            <a href="#palvelut" className="btn-secondary">Katso palvelut</a>
          </div>
        </div>
        <div className="scroll-indicator"><div className="scroll-line" /></div>
      </section>

      <section className="services" id="palvelut">
        <div className="section-label">Palvelut</div>
        <div className="services-header">
          <h2 className="services-title">Mitä me<br /><em>teemme</em></h2>
          <p className="services-desc">Erikoistumme modernien verkkosivujen suunnitteluun ja toteutukseen. Jokainen projekti on uniikki – ei valmispohjia.</p>
        </div>
        <div className="services-grid reveal">
          <div className="service-card">
            <div className="service-num">01</div>
            <div className="service-title">Verkkosivujen suunnittelu</div>
            <div className="service-desc">Uniikki visuaalinen identiteetti joka erottuu kilpailijoista ja jää mieleen. Ei valmistemplaatteja.</div>
          </div>
          <div className="service-card">
            <div className="service-num">02</div>
            <div className="service-title">Toteutus</div>
            <div className="service-desc">Nopeat, hakukoneoptimoidut sivut modernilla teknologialla. Automatisoidut päivitykset.</div>
          </div>
          <div className="service-card">
            <div className="service-num">03</div>
            <div className="service-title">Sisällönhallinta</div>
            <div className="service-desc">Päivität itse tekstit, kuvat ja yhteystiedot helpossa hallintapaneelissa – ilman ohjelmointiosaamista.</div>
          </div>
        </div>
      </section>

      <section className="process" id="prosessi">
        <div className="process-inner">
          <h2 className="process-title">Näin projekti <em>etenee</em></h2>
          <div className="steps reveal">
            {[
              { n: "01", t: "Kartoitus", d: "Käydään läpi tarpeesi, tavoitteet ja aikataulu. Maksuton alkukeskustelu." },
              { n: "02", t: "Suunnittelu", d: "Design-konsepti ja rakenne ennen koodausta. Näet miltä sivut näyttävät." },
              { n: "03", t: "Toteutus", d: "Rakennetaan, testataan ja hiotaan. Pidämme sinut ajan tasalla koko matkan." },
              { n: "04", t: "Julkaisu", d: "Sivusto live, koulutus hallintapaneeliin ja tuki käyttöönoton jälkeen." },
            ].map((s) => (
              <div key={s.n} className="step">
                <div className="step-circle">{s.n}</div>
                <div className="step-title">{s.t}</div>
                <div className="step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="yhteys">
        <div className="reveal">
          <div className="section-label">Yhteystiedot</div>
          <h2 className="contact-title">Aloitetaan<br /><em>yhdessä</em></h2>
          <p className="contact-sub">Kerro projektistasi – vastataan 24 tunnin sisällä ja sovitaan maksuton alkukeskustelu.</p>
          <div className="contact-links">
            <a href="mailto:info@mediasata.fi" className="contact-link"><span className="contact-link-icon">Email</span>info@mediasata.fi</a>
            <a href="tel:+358453207900" className="contact-link"><span className="contact-link-icon">Puh</span>045 320 7900</a>
            <a href="#" className="contact-link"><span className="contact-link-icon">Sijainti</span>Riihimäki, Suomi</a>
          </div>
        </div>
        <div className="reveal">
          <form className="contact-form" action="mailto:info@mediasata.fi" method="POST" encType="text/plain">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nimi</label>
              <input id="name" name="Nimi" type="text" className="form-input" placeholder="Etunimi Sukunimi" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Sähköposti</label>
              <input id="email" name="Sähköposti" type="email" className="form-input" placeholder="sinä@yritys.fi" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Viesti</label>
              <textarea id="message" name="Viesti" className="form-textarea" placeholder="Kerro projektistasi lyhyesti..." />
            </div>
            <button className="form-submit" type="submit">Lähetä viesti →</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-logo">Media<span>sata</span></div>
        <div className="footer-copy">© 2026 Mediasata · Kaikki oikeudet pidätetään</div>
      </footer>
    </>
  );
}
