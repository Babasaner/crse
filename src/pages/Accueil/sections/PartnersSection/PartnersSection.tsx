export const PartnersSection = (): JSX.Element => {
  const officialPartners = [
    {
      name: "Ministère du Pétrole et des Énergies",
      url: "https://energie-mines.gouv.sn/",
      logo: "https://www.crse.sn/wp-content/uploads/2026/09/Logo-ministere-petrole-et-du-mines.jpg",
    },
    {
      name: "Ministère de l'Industrie et du Commerce",
      url: "https://industriecommerce.gouv.sn/",
      logo: "https://www.crse.sn/wp-content/uploads/2026/03/logoMIC-officiel.jpg",
    },
    {
      name: "Millennium Challenge Account (MCA Sénégal II)",
      url: "https://mcasenegal.sn/",
      logo: "https://www.crse.sn/wp-content/uploads/2025/09/Mllenium-Senegal.jpg",
    },
    {
      name: "Ministère des Finances et du Budget",
      url: "https://finances.gouv.sn/",
      logo: "https://www.crse.sn/wp-content/uploads/2026/03/ministere-des-finances-et-du-budget.png",
    },
  ]

  return (
    <section className="w-full bg-slate-50/70 border-t border-b border-slate-200/60 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
            Coopération & Synergie Institutionnelle
          </span>
          <h2 className="text-[30px] sm:text-[38px] font-bold text-chathams-blue leading-tight mt-1">
            Nos Partenaires
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-slate-600">
            Un partenariat fort pour consolider la gouvernance, l'investissement et la transition énergétique au Sénégal.
          </p>
        </div>

        {/* Grille des partenaires avec logos officiels et liens externes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {officialPartners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className="group flex flex-col items-center justify-center p-6 h-36 sm:h-40 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-16 sm:max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="sr-only">{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
