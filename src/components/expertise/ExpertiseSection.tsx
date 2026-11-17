import { personalProfile } from "@/data/site";

export default function ExpertiseSection() {
  return (
    <section id="expertise" data-reveal className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#9fcaf7]">Technology stack</p>
          <h2 className="mt-5 text-3xl font-medium uppercase tracking-[-0.05em] text-white md:text-5xl">
            MY EXPERTISE
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personalProfile.expertise.map((item) => (
            <article
              key={item.name}
              className="group rounded-[24px] border border-white/10 bg-[rgba(14,17,22,0.82)] p-6 shadow-[0_20px_60px_rgba(4,11,22,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#9ccfff]/40 hover:bg-[rgba(17,20,28,0.95)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#9ecbff]/35 bg-[#9ecbff]/10 text-[10px] font-medium uppercase tracking-[0.22em] text-[#dfefff]">
                {item.name.slice(0, 2)}
              </div>
              <h3 className="text-[22px] font-medium uppercase tracking-[-0.04em] text-white">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
