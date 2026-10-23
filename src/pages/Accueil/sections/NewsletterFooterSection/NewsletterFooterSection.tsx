import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Link } from "react-router-dom";

const regulatorLinks = [
  "Présentation",
  "Le CRD",
  "La CRSE à l'international",
  "Prospective et innovation",
  "Recrutement",
  "Appel d'offres",
];

const practicalLinks = [
  "Presse et média",
  "Nos lettres d'informations",
  "Open data",
  "Marchés publics",
  "Liens utiles",
  "Glossaire",
];

const otherSites = [
  "Presidence.sn",
  "Primature.sn",
  "Energie.gouv.sn",
  "Senegal2050.sn",
];

const legalLinks = [
  "Mentions légales et politique de confidentialité",
  "Accessibilité",
  "Plan du site",
  "Préférences cookies",
];

const FooterLink = ({ children, to = "/ressources" }: { children: string; to?: string }) => (
  <Link to={to} className="w-fit text-left font-[Inter] text-[16.7px] font-normal leading-[37px] text-black transition-opacity hover:opacity-60">
    {children}
  </Link>
);

export const NewsletterFooterSection = (): JSX.Element => {
  return (
    <footer className="flex min-h-[836px] w-full flex-col font-[Inter]">
      <section className="bg-chathams-blue">
        <div className="mx-auto flex min-h-[202px] w-full max-w-[1440px] items-center gap-12 px-6 py-8 lg:px-0">
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-[clamp(22px,1.43vw,27.5px)] leading-[1.95] text-white">
              Abonnez-vous à nos lettres d&apos;information !
            </h2>
            <p className="font-semantic-heading-1 text-[length:var(--semantic-heading-1-font-size)] font-[number:var(--semantic-heading-1-font-weight)] leading-[var(--semantic-heading-1-line-height)] text-alto">
              Restez informé de toute l&apos;actualité de la CRSE.
            </p>
          </div>
          <form
            className="flex min-w-0 flex-1"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Votre adresse de messagerie"
              aria-label="Votre adresse de messagerie"
              className="h-[63px] min-w-0 flex-1 rounded-l-[100px] rounded-r-none border-0 bg-white px-10 font-semantic-input text-[length:var(--semantic-input-font-size)] text-black shadow-none placeholder:text-black placeholder:opacity-60 focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="h-[65px] w-[180px] shrink-0 rounded-l-none rounded-r-[100px] bg-shakespeare px-6 font-semantic-button text-[length:var(--semantic-button-font-size)] font-[number:var(--semantic-button-font-weight)] leading-[var(--semantic-button-line-height)] text-white shadow-none hover:bg-shakespeare/90"
            >
              S&apos;abonner
            </Button>
          </form>
        </div>
      </section>
      <section className="flex-1 bg-catskill-white">
        <div className="mx-auto flex min-h-[634px] w-full max-w-[1440px] flex-col px-6 pt-14 lg:px-0">
          <div className="grid flex-1 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_0.9fr]">
            <div className="border-r-0 border-[#76797c] pb-10 lg:border-r lg:pr-14">
              <Link to="/" aria-label="Accueil CRSE" className="block w-fit"><img className="h-[76px] w-[160px] object-contain object-left" alt="CRSE" src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/crse-logopng-png.png" /></Link>
              <address className="mt-8 w-full max-w-[317px] not-italic text-[16.9px] leading-[27px] text-black">
                <strong>Siège</strong>
                <br />
                PG2J+2GF, Rue KA 05
                <br />
                Bidaness Building, VDN, Mermoz
                <br />
                BP : 11701 Dakar, Sénégal
                <br />
                Tél : <a href="tel:+221338490459">+221 33 849 04 59</a> – <a href="mailto:crse@crse.sn">crse@crse.sn</a>
              </address>
              <div className="mt-14 flex items-center gap-6">
                <span className="whitespace-nowrap text-[15px] leading-5 text-black">
                  Suivez-nous :
                </span>
                <div className="flex items-center gap-4">
                  <a href="https://www.linkedin.com/company/crse-senegal/" aria-label="LinkedIn CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 transition-opacity">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.66.72-1.66 1.66 0 .95.71 1.66 1.66 1.66.95 0 1.66-.71 1.66-1.66 0-.94-.71-1.66-1.66-1.66Z"/></svg>
                  </a>
                  <a href="https://x.com/CRSE_Senegal" aria-label="X (Twitter) CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 transition-opacity">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/CRSESenegal" aria-label="Facebook CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 transition-opacity">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@CRSESenegal" aria-label="YouTube CRSE" target="_blank" rel="noopener noreferrer" className="text-black opacity-70 hover:opacity-100 transition-opacity">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <nav
              aria-label="Le Régulateur"
              className="flex flex-col items-start"
            >
              <h3 className="mb-1 text-[17.2px] font-semibold leading-[33px] text-black">
                Le Régulateur
              </h3>
              {regulatorLinks.map((link) => (
                <FooterLink key={link}>{link}</FooterLink>
              ))}
            </nav>
            <nav
              aria-label="Liens pratiques"
              className="flex flex-col items-start"
            >
              <h3 className="mb-1 text-[17.3px] font-semibold leading-[33px] text-black">
                Liens pratiques
              </h3>
              {practicalLinks.map((link) => (
                <FooterLink key={link}>{link}</FooterLink>
              ))}
            </nav>
            <nav
              aria-label="Besoin d'aide"
              className="flex flex-col items-start"
            >
              <h3 className="mb-1 text-[17.7px] font-semibold leading-[33px] text-black">
                Besoin d&apos;aide ?
              </h3>
              <FooterLink to="/contact">Contact et FAQ</FooterLink>
              <h3 className="mb-1 mt-1 text-[17.3px] font-semibold leading-[33px] text-black">
                Autres sites
              </h3>
              {otherSites.map((site) => (
                <FooterLink key={site}>{site}</FooterLink>
              ))}
            </nav>
          </div>
          <div className="border-t border-[#76797c] py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="font-semantic-heading-2 text-[length:var(--semantic-heading-2-font-size)] leading-[var(--semantic-heading-2-line-height)] text-black">
                © Copyright 2025, CRSE. Tous droits réservés.
              </p>
              <nav
                aria-label="Informations légales"
                className="flex flex-wrap items-center gap-x-7 gap-y-2"
              >
                {legalLinks.map((link) => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </nav>
              <button
                type="button"
                aria-label="Retour en haut"
                className="shrink-0 transition-opacity hover:opacity-70"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  className="h-12 w-12"
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
