import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'

interface PageBannerProps {
  eyebrow: string
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumb?: boolean
  children?: React.ReactNode
}

export function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumbs,
  showBreadcrumb = true,
  children,
}: PageBannerProps) {
  return (
    <section className="w-full bg-[#f1f6fa] border-b border-[#e2e8f0] py-8 sm:py-12 lg:py-14 animate-fade-in">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        {/* Fil d'Ariane uniforme */}
        {showBreadcrumb && (
          <div className="mb-4 sm:mb-6">
            <Breadcrumb items={breadcrumbs} currentPageTitle={title} />
          </div>
        )}

        {/* Titres & Hiérarchie de page */}
        <div className="max-w-[1050px]">
          {eyebrow && (
            <p className="mb-2 text-[12px] sm:text-[13px] font-bold tracking-widest text-shakespeare uppercase">
              {eyebrow}
            </p>
          )}

          <h1 className="text-[clamp(28px,3.6vw,46px)] font-extrabold leading-[1.15] text-[#1b3e80] tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-3.5 sm:mt-4 max-w-[850px] text-[15px] sm:text-[17px] leading-relaxed text-[#536476]">
              {description}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}
