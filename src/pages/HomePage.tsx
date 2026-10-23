import { NewsMarqueeSection } from './Accueil/sections/NewsMarqueeSection/NewsMarqueeSection'
import { DocumentsSection } from './Accueil/sections/DocumentsSection/DocumentsSection'
import { HeroBannerSection } from './Accueil/sections/HeroBannerSection/HeroBannerSection'
import { KeyStatisticsSection } from './Accueil/sections/KeyStatisticsSection/KeyStatisticsSection'
import { NewsHighlightsSection } from './Accueil/sections/NewsHighlightsSection/NewsHighlightsSection'
import { OrganizationOverviewSection } from './Accueil/sections/OrganizationOverviewSection/OrganizationOverviewSection'
import { PartnersSection } from './Accueil/sections/PartnersSection/PartnersSection'
import { RecruitmentSection } from './Accueil/sections/RecruitmentSection/RecruitmentSection'
import { ToolsSection } from './Accueil/sections/ToolsSection/ToolsSection'
import { useWPPosts } from '../hooks/useWordPress'

export function HomePage() {
  const { posts } = useWPPosts({ perPage: 8 })

  return (
    <div className="crse-home flex w-full flex-col overflow-x-hidden bg-white">
      {/* Bandeau défilant des dernières actualités */}
      <NewsMarqueeSection posts={posts} />
      
      <section aria-label="Hero banner">
        <HeroBannerSection />
      </section>

      <OrganizationOverviewSection />
      <DocumentsSection />
      <NewsHighlightsSection posts={posts} />
      <ToolsSection />
      <KeyStatisticsSection />
      
      <section aria-label="Recrutement et partenaires">
        <RecruitmentSection />
        <PartnersSection />
      </section>
    </div>
  )
}
