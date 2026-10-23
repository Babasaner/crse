import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useCountUp } from "../../../../hooks/useCountUp";

const statisticsData = [
  {
    targetValue: 145,
    suffix: "",
    label: "décisions rendues sur les tarifs d'électricité",
  },
  {
    targetValue: 60,
    suffix: "",
    label: "avis émis sur les textes et demandes de titres",
  },
  {
    targetValue: 12,
    suffix: "",
    label: "structures des prix des hydrocarbures élaborées",
  },
];

function StatItem({
  targetValue,
  suffix,
  label,
  isVisible,
  isLast,
}: {
  targetValue: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  isLast: boolean;
}) {
  const animatedValue = useCountUp(targetValue, 2200, isVisible);

  return (
    <article
      className={`flex flex-col items-center justify-start text-center p-6 ${
        !isLast ? "border-b border-white/20 sm:border-b-0 sm:border-r" : ""
      }`}
    >
      <p className="order-1 font-bold text-[clamp(44px,4.5vw,58px)] leading-none text-white tracking-tight">
        {isVisible ? animatedValue : 0}
        {suffix}
      </p>
      <p className="order-2 mt-4 max-w-[280px] font-medium text-[17px] leading-snug text-white/95">
        {label}
      </p>
    </article>
  );
}

export const KeyStatisticsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="crse-statistics w-full bg-[#55aed0] py-20"
      aria-label="Chiffres clés"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 lg:px-12">
        <h2 className="text-center font-bold text-[clamp(32px,3.2vw,44px)] leading-[1.2] text-white">
          La CRSE en 2025...
        </h2>
        <div className="mt-14 grid w-full grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {statisticsData.map((statistic, index) => (
            <StatItem
              key={statistic.label}
              targetValue={statistic.targetValue}
              suffix={statistic.suffix}
              label={statistic.label}
              isVisible={isVisible}
              isLast={index === statisticsData.length - 1}
            />
          ))}
        </div>
        <Button
          asChild
          className="mt-12 flex h-[56px] items-center justify-center gap-3 rounded-full bg-white px-8 text-[16px] font-semibold text-[#1b3e80] shadow-md hover:bg-white/95 hover:shadow-lg transition-all"
        >
          <Link to="/electricite/chiffres-cles">
            <span>Explorer tous les indicateurs</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
