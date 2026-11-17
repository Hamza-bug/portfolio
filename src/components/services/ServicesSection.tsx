import { personalProfile } from "@/data/site";

export default function ServicesSection() {
  return (
    <section id="services" data-reveal className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#9fcaf7]">Capabilities</p>
          <h2 className="mt-5 text-3xl font-medium uppercase tracking-[-0.05em] text-white md:text-5xl">
            WHAT I CAN BUILD
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personalProfile.services.map((service) => (
            <article
              key={service.number}
              className="group rounded-[26px] border border-white/10 bg-[rgba(13,16,22,0.84)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9ccfff]/30 hover:bg-[rgba(17,20,28,0.96)]"
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9fd0ff]">{service.number}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-slate-200">
                  {service.title.slice(0, 1)}
                </span>
              </div>
              <h3 className="text-[22px] font-medium uppercase tracking-[-0.04em] text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
