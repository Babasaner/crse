import type { ReactElement } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const informationCards = [
  {
    title: ["Usurpation d'identité et", "démarchage abusif"],
    description: [
      "La CRSE a été alertée de diverses",
      "pratiques de démarcheurs usurpant son",
      "identité (nom, logo).",
    ],
    className: "bg-catskill-white border-transparent",
    contentClassName: "pt-9",
    titleClassName: "text-[22.7px] leading-7",
    descriptionClassName: "mt-4 text-[18.9px] leading-[26px]",
  },
  {
    title: [
      "Treize lignes directrices pour",
      "renforcer la protection des",
      "consommateurs",
    ],
    description: [
      "La CRSE a établi une liste de mesures",
      "visant à améliorer la transparence",
      "des offres proposées par les",
      "fournisseurs.",
    ],
    className: "bg-white border-[#d6d6d6]",
    contentClassName: "pt-[29px]",
    titleClassName: "text-[22.7px] leading-7",
    descriptionClassName: "mt-2 text-[18.6px] leading-[26px]",
  },
  {
    title: ["Besoin d'aide ?"],
    description: [
      "La CRSE met à disposition de tous une",
      "FAQ pour répondre à toutes vos",
      "questions.",
    ],
    className: "bg-chathams-blue border-transparent",
    contentClassName: "pt-[50.9px]",
    titleClassName: "text-[23.3px] leading-7 text-white",
    descriptionClassName: "mt-4 text-[18.8px] leading-[26px] text-white",
  },
];

const actionIcon =
  "https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/group-20-svg.svg";

export const InformationResourcesSection = (): ReactElement => {
  return (
    <section className="relative mx-auto flex w-full max-w-[1200px] flex-col px-6 py-0 sm:px-8 lg:px-0">
      <h2 className="font-[Inter] text-[42.7px] font-bold leading-[37px] tracking-0 text-chathams-blue">
        Vous informer
      </h2>
      <div className="mt-[56px] grid grid-cols-1 gap-5 md:grid-cols-3">
        {informationCards.map((card) => (
          <Card
            key={card.title.join("-")}
            className={`h-[266px] overflow-hidden rounded-[5px] shadow-none ${card.className}`}
          >
            <CardContent
              className={`flex h-full flex-col px-[29px] pb-[13px] ${card.contentClassName}`}
            >
              <h3
                className={`font-[Inter] font-bold tracking-0 text-firefly ${card.titleClassName} ${
                  card.className.includes("bg-chathams-blue")
                    ? "text-white"
                    : ""
                }`}
              >
                {card.title.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </h3>
              <div className="flex min-h-0 flex-1">
                <p
                  className={`font-[Inter] font-normal tracking-0 ${card.descriptionClassName} ${
                    card.className.includes("bg-chathams-blue")
                      ? "text-white"
                      : "text-firefly"
                  }`}
                >
                  {card.description.map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </p>
                <img
                  className="ml-auto mt-auto h-[68px] w-[68px] shrink-0"
                  alt=""
                  aria-hidden="true"
                  src={actionIcon}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
