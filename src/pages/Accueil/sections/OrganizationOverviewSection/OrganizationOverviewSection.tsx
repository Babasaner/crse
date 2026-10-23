import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

const informationLinks = [
  { label: "La loi n° 2021-32 du 09 juillet 2021 portant création de la CRSE", to: "/documents?cats=textes" },
  { label: "Politique qualité 2026", to: "/politique-qualite" },
  { label: "Organigramme de la CRSE", to: "/organisation" },
];

const missionItems = [
  {
    label: "Secteur de l’électricité",
    color: "text-[#55aed0]",
    icon: "https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-1.svg",
  },
  {
    label: "Secteur aval des hydrocarbures",
    color: "text-[#da6830]",
    icon: "https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-2.svg",
  },
  {
    label: "Segments aval et intermédiaires gazier",
    color: "text-[#e38d19]",
    icon: "https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-18.svg",
  },
];

export const OrganizationOverviewSection = (): JSX.Element => {
  return (
    <section className="crse-overview mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-12">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_520px]">
        <div className="flex min-w-0 flex-col">
          <h2 className="max-w-[745px] font-semantic-heading-h1 text-[length:var(--semantic-heading-h1-font-size)] font-[number:var(--semantic-heading-h1-font-weight)] leading-[var(--semantic-heading-h1-line-height)] tracking-[var(--semantic-heading-h1-letter-spacing)] text-chathams-blue [font-style:var(--semantic-heading-h1-font-style)]">
            La Commission de Régulation du Secteur de l&apos;Énergie est
            <br />
            l&apos;autorité administrative indépendante en charge du bon
            <br />
            fonctionnement des marchés de l&apos;électricité, des
            <br />
            hydrocarbures et du gaz au Sénégal.
          </h2>
          <p className="mt-5 max-w-[745px] font-[Inter,Helvetica] text-[21.7px] font-normal leading-7 text-gray">
            La mission de la CRSE est de veiller au bon fonctionnement des
            marchés
            <br />
            de détail passe en outre par son intervention dans la fixation des
            tarifs
            <br />
            réglementés de vente d&apos;électricité.
          </p>
          <Button
            asChild
            className="mt-8 flex h-[73px] w-full max-w-[363px] items-center justify-between rounded-[44px] bg-chathams-blue px-7 font-[Inter,Helvetica] text-2xl font-normal leading-6 text-white hover:bg-chathams-blue/90"
          >
            <Link to="/presentation"><span>Présentation de la CRSE</span><img className="h-[19px] w-6 shrink-0" alt="" src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-4.svg" /></Link>
          </Button>
          <nav
            aria-label="Documents de la CRSE"
            className="mt-16 flex w-full max-w-[745px] flex-col"
          >
            {informationLinks.map((link, index) => (
              <Link
                to={link.to}
                key={link.to}
                className={`flex min-h-[77px] items-center gap-[13.2px] border-[#1b3e80] text-dove-gray transition-colors hover:text-chathams-blue ${
                  index === 0 ? "border-y" : "border-b"
                }`}
              >
                <img
                  className="h-[33px] w-[33px] shrink-0"
                  alt=""
                  src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-3.svg"
                />
                <span className="font-[Inter,Helvetica] text-[clamp(18px,2vw,25px)] font-normal leading-7">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <Card className="w-full rounded-[10px] border-0 bg-chathams-blue text-white shadow-none">
          <CardHeader className="px-7 pb-0 pt-14">
            <CardTitle className="font-[Inter,Helvetica] text-[38.1px] font-bold leading-[37px]">
              Missions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-7 pb-7 pt-5">
            <p className="font-[Inter,Helvetica] text-[19.7px] font-normal leading-[26px] text-swiss-coffee">
              Dans le cadre de sa mission de régulation,
              <br />
              la Commission dispose d&apos;attributions consultatives
              <br />
              et d&apos;attributions décisionnelles.
            </p>
            <div className="mt-9 flex flex-col">
              {missionItems.map((mission, index) => (
                <div
                  key={mission.label}
                  className={`flex min-h-[85px] items-start gap-[22px] ${
                    index > 0 ? "mt-2" : ""
                  }`}
                >
                  <img
                    className="h-[50px] w-[50px] shrink-0"
                    alt=""
                    src={mission.icon}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span
                      className={`pt-[5px] font-[Inter,Helvetica] text-[23.4px] font-normal leading-10 ${mission.color}`}
                    >
                      {mission.label}
                    </span>
                    <span className="mt-2 block w-full border-b border-white opacity-30" />
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="ml-auto mt-5 flex h-12 w-full max-w-[353px] items-center justify-between rounded-[44px] bg-chathams-blue px-6 font-[Inter,Helvetica] text-2xl font-normal leading-6 text-white hover:bg-[#16366f]"
            >
              <Link to="/missions"><span>Missions et Attributions</span><img className="h-6 w-6 shrink-0" alt="" src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/svg-9.svg" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
