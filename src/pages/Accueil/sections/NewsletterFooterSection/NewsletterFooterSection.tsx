import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Link } from "react-router-dom";

interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
}

const regulatorLinks: FooterLinkItem[] = [
  { label: "Présentation", to: "/presentation" },
  { label: "Le CRD", to: "/organisation" },
  { label: "La CRSE à l'international", to: "/presentation" },
  { label: "Prospective et innovation", to: "/presentation" },
  { label: "Recrutement", to: "/recrutement" },
  { label: "Appel d'offres", to: "/operateurs/marches" },
];

const practicalLinks: FooterLinkItem[] = [
  { label: "Presse et média", to: "/actualites" },
  { label: "Nos lettres d'informations", to: "#newsletter" },
  { label: "Open data", to: "/documents" },
  { label: "Marchés publics", to: "/operateurs/marches" },
  { label: "Liens utiles", to: "/secteurs" },
  { label: "Glossaire", to: "/faq" },
];

const otherSites: FooterLinkItem[] = [
  { label: "Presidence.sn", href: "https://www.presidence.sn" },
  { label: "Primature.sn", href: "https://www.primature.sn" },
  { label: "Energie.gouv.sn", href: "https://energie.gouv.sn" },
  { label: "Senegal2050.sn", href: "https://senegal2050.sn" },
];

const legalLinks: FooterLinkItem[] = [
  { label: "Mentions légales et politique de confidentialité", to: "/mentions-legales" },
  { label: "Accessibilité", to: "/contact" },
  { label: "Plan du site", to: "/la-crse" },
  { label: "Préférences cookies", to: "#cookies" },
];

const FooterLink = ({ item }: { item: FooterLinkItem }) => {
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit text-left font-[Inter] text-[16px] font-normal leading-[36px] text-black transition-colors hover:text-chathams-blue"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.to ?? "/la-crse"}
      className="w-fit text-left font-[Inter] text-[16px] font-normal leading-[36px] text-black transition-colors hover:text-chathams-blue"
    >
      {item.label}
    </Link>
  );
};

export const NewsletterFooterSection = (): JSX.Element => {
  return (
    <footer className="flex min-h-[700px] w-full flex-col font-[Inter]">
      {/* 1. SECTION NEWSLETTER ADAPTATIVE & MOBILE-FRIENDLY */}
      <section id="newsletter" className="bg-chathams-blue">
        <div className="mx-auto flex flex-col lg:flex-row min-h-[160px] lg:min-h-[190px] w-full max-w-[1440px] items-start lg:items-center justify-between gap-6 lg:gap-12 px-6 py-8 lg:px-12">
          <div className="min-w-0 max-w-xl">
            <h2 className="font-bold text-[clamp(22px,1.6vw,28px)] leading-tight text-white">
              Abonnez-vous à nos lettres d&apos;information !
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] text-alto leading-relaxed">
              Restez informé de toute l&apos;actualité de la CRSE.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row w-full lg:max-w-[560px] min-w-0 gap-3 sm:gap-0"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Votre adresse de messagerie"
              aria-label="Votre adresse de messagerie"
              className="h-[54px] sm:h-[62px] min-w-0 flex-1 rounded-full sm:rounded-l-[100px] sm:rounded-r-none border-0 bg-white px-6 sm:px-8 font-semantic-input text-[15px] text-black shadow-none placeholder:text-black placeholder:opacity-60 focus-visible:ring-2 focus-visible:ring-shakespeare"
            />
            <Button
              type="submit"
              className="h-[54px] sm:h-[62px] w-full sm:w-[170px] shrink-0 rounded-full sm:rounded-l-none sm:rounded-r-[100px] bg-shakespeare px-6 font-semibold text-[15px] text-white shadow-none hover:bg-shakespeare/90 transition-colors"
            >
              S&apos;abonner
            </Button>
          </form>
        </div>
      </section>

      {/* 2. SECTION PRINCIPALE DES LIENS DU SITE */}
      <section className="flex-1 bg-catskill-white">
        <div className="mx-auto flex min-h-[550px] w-full max-w-[1440px] flex-col px-6 pt-12 sm:pt-14 lg:px-12">
          <div className="grid flex-1 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_0.9fr]">
            <div className="border-r-0 border-[#76797c]/40 pb-10 lg:border-r lg:pr-14">
              <Link to="/" aria-label="Accueil CRSE" className="block w-fit">
                <img
                  className="h-[76px] w-[160px] object-contain object-left"
                  alt="CRSE"
                  src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/crse-logopng-png.png"
                />
              </Link>
              <address className="mt-8 w-full max-w-[320px] not-italic text-[15px] sm:text-[16px] leading-[26px] text-black">
                <strong>Siège</strong>
                <br />
                PG2J+2GF, Rue KA 05
                <br />
                Bidaness Building, VDN, Mermoz
                <br />
                BP : 11701 Dakar, Sénégal
                <br />
                Tél : <a href="tel:+221338490459" className="hover:text-chathams-blue hover:underline">+221 33 849 04 59</a> – <a href="mailto:crse@crse.sn" className="hover:text-chathams-blue hover:underline">crse@crse.sn</a>
              </address>
              <div className="mt-10 sm:mt-12 flex items-center gap-5">
                <span className="whitespace-nowrap text-[14px] sm:text-[15px] font-semibold text-black">
                  Suivez-nous :
                </span>
                <div className="flex items-center gap-3.5">
                  <a href="https://www.linkedin.com/company/crse-senegal/" aria-label="LinkedIn CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 hover:text-chathams-blue transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.66.72-1.66 1.66 0 .95.71 1.66 1.66 1.66.95 0 1.66-.71 1.66-1.66 0-.94-.71-1.66-1.66-1.66Z"/></svg>
                  </a>
                  <a href="https://x.com/CRSE_Senegal" aria-label="X (Twitter) CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 hover:text-chathams-blue transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/CRSESenegal" aria-label="Facebook CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 hover:text-chathams-blue transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@CRSESenegal" aria-label="YouTube CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 hover:text-chathams-blue transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <nav aria-label="Le Régulateur" className="flex flex-col items-start">
              <h3 className="mb-2 text-[17px] font-bold text-black border-b-2 border-shakespeare/40 pb-1">
                Le Régulateur
              </h3>
              {regulatorLinks.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </nav>

            <nav aria-label="Liens pratiques" className="flex flex-col items-start">
              <h3 className="mb-2 text-[17px] font-bold text-black border-b-2 border-shakespeare/40 pb-1">
                Liens pratiques
              </h3>
              {practicalLinks.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </nav>

            <nav aria-label="Besoin d'aide" className="flex flex-col items-start">
              <h3 className="mb-2 text-[17px] font-bold text-black border-b-2 border-shakespeare/40 pb-1">
                Besoin d&apos;aide ?
              </h3>
              <FooterLink item={{ label: "Contact et FAQ", to: "/contact" }} />
              <FooterLink item={{ label: "Faire une réclamation", to: "/reclamations" }} />
              <h3 className="mb-2 mt-4 text-[17px] font-bold text-black border-b-2 border-shakespeare/40 pb-1">
                Autres sites
              </h3>
              {otherSites.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </nav>
          </div>

          {/* 3. BARRE INFÉRIEURE : COPYRIGHT & MENTIONS LÉGALES */}
          <div className="border-t border-[#76797c]/30 py-6 mt-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-[14px] text-slate-600">
                © Copyright 2025, CRSE. Tous droits réservés.
              </p>
              <nav
                aria-label="Informations légales"
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]"
              >
                {legalLinks.map((item) => (
                  <FooterLink key={item.label} item={item} />
                ))}
              </nav>
              <button
                type="button"
                aria-label="Retour en haut"
                className="shrink-0 transition-transform hover:-translate-y-1 hover:opacity-80 active:translate-y-0"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  className="h-11 w-11"
                  alt="Retour en haut"
                  src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/link.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
