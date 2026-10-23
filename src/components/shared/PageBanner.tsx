export function PageBanner({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="w-full bg-[#f1f6fa] border-b border-[#e2e8f0] py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <p className="mb-2 text-[13px] font-bold tracking-widest text-shakespeare uppercase">
          {eyebrow}
        </p>
        <h1 className="max-w-[1000px] text-[clamp(32px,3.8vw,52px)] font-bold leading-[1.12] text-[#1b3e80]">
          {title}
        </h1>
        <p className="mt-4 max-w-[850px] text-[17px] leading-relaxed text-[#536476]">
          {description}
        </p>
      </div>
    </section>
  )
}