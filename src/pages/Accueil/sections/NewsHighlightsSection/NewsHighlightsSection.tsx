import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import type { WPPost } from "../../../../lib/wordpress";
import { formatWPDate, getPostCategories, getPostImage, stripHtml } from "../../../../lib/wordpress";

const categoryLabels: Record<number, string> = {
  27: "Aval & Intermédiaire gazier",
  28: "Hydrocarbures",
  75: "CRSE",
  76: "Consommateurs",
  79: "Énergie",
  90: "Événements",
  16: "Communiqués de presse",
  17: "Avis & Décisions",
  26: "Électricité",
};

const categoryColors: Record<number, string> = {
  27: "text-[#e38d19]",
  28: "text-[#da6830]",
  76: "text-shakespeare",
  79: "text-green-700",
  90: "text-[#da6830]",
};

export const NewsHighlightsSection = ({ posts = [] }: { posts?: WPPost[] }): JSX.Element => {
  const newsTrack = useRef<HTMLDivElement>(null);

  const scrollNews = (direction: -1 | 1) => {
    const track = newsTrack.current;
    if (!track) return;
    const cardWidth = track.querySelector('article')?.offsetWidth ?? 320;
    track.scrollBy({ left: direction * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#f8fafc] py-16" aria-label="Actualités de la CRSE">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 lg:px-12">
        {/* En-tête de section aligné : Titre à gauche, contrôles carrousel à droite */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#e2e8f0] pb-6">
          <div>
            <span className="text-[13px] font-bold tracking-wider text-shakespeare uppercase">
              Actualités & Événements
            </span>
            <h2 className="mt-1 text-[clamp(28px,3vw,38px)] font-bold text-chathams-blue">
              L'actu CRSE
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/actualites"
              className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-chathams-blue hover:text-shakespeare transition-colors mr-2"
            >
              <span>Toutes les actualités</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-[44px] w-[44px] rounded-full border-chathams-blue/30 bg-white text-chathams-blue hover:border-chathams-blue hover:bg-chathams-blue hover:text-white transition-all shadow-sm"
                aria-label="Actualités précédentes"
                onClick={() => scrollNews(-1)}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-[44px] w-[44px] rounded-full border-chathams-blue/30 bg-white text-chathams-blue hover:border-chathams-blue hover:bg-chathams-blue hover:text-white transition-all shadow-sm"
                aria-label="Actualités suivantes"
                onClick={() => scrollNews(1)}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel d'actualités */}
        <div
          ref={newsTrack}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Articles récents"
        >
          {posts.map((item) => {
            const categories = getPostCategories(item);
            const image = getPostImage(item);
            const title = stripHtml(item.title.rendered);

            return (
            <Card
              key={item.id}
              className="w-[min(85vw,340px)] shrink-0 snap-start overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm hover:shadow-md transition-shadow sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
              role="article"
            >
              <CardContent className="flex h-full flex-col p-4">
                <Link
                  to={`/actualites/${item.slug}`}
                  aria-label={`Lire l'actualité : ${title}`}
                  className="block overflow-hidden rounded-lg aspect-[16/10] bg-slate-100"
                >
                  {image ? <div
                    role="img"
                    aria-label="Illustration de l'actualité"
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url("${image}")` }}
                  /> : <div className="flex h-full items-center justify-center bg-chathams-blue text-2xl font-bold text-white">CRSE</div>}
                </Link>

                {/* Catégories */}
                <div className="mt-3.5 flex min-h-[22px] flex-wrap items-center gap-1.5">
                  {categories.map((category, categoryIndex) => (
                    <span
                      key={category.id}
                      className={`text-[12px] font-semibold ${categoryColors[category.id] ?? "text-chathams-blue"}`}
                    >
                      {categoryLabels[category.id] ?? category.name}
                      {categoryIndex === 0 && categories.length > 1 && (
                        <span className="ml-1 text-slate-400">•</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Titre */}
                <h3 className="mt-2 text-[16px] font-bold leading-snug text-[#1b3e80] line-clamp-3 min-h-[66px]">
                    <Link to={`/actualites/${item.slug}`} className="hover:text-shakespeare transition-colors">
                    {title}
                  </Link>
                </h3>

                {/* Date et lien de lecture */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                  <time dateTime={item.date}>{formatWPDate(item.date)}</time>
                  <Link
                    to={`/actualites/${item.slug}`}
                    className="font-semibold text-chathams-blue hover:text-shakespeare inline-flex items-center gap-0.5"
                  >
                    Lire <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>

        {/* Bouton mobile pour voir toutes les actualités */}
        <div className="mt-6 flex sm:hidden justify-center">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-chathams-blue text-chathams-blue"
          >
            <Link to="/actualites">
              <span>Voir toutes les actualités</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
