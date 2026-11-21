"use client";

import {
  SiAngular,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
} from "@icons-pack/react-simple-icons";
import { personalProfile } from "@/data/site";
import { rowan } from "@/app/fonts/rowan";

function BrandIcon({ name }: { name: string }) {
  const iconProps = { size: 72, "aria-label": name, title: name, role: "img" };

  if (name === "JavaScript") return <SiJavascript {...iconProps} color="default" />;
  if (name === "Angular") return <SiAngular {...iconProps} color="#DD0031" />;
  if (name === "React.js" || name === "React Native") return <SiReact {...iconProps} color="default" />;
  if (name === "Next.js") return <SiNextdotjs {...iconProps} color="#F4F7F8" />;
  return <SiNodedotjs {...iconProps} color="default" />;
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" data-reveal className="expertise-section py-24 md:py-32">
      <div className="section-shell">
        <header className="expertise-header">
          <p className="expertise-kicker"><span /> Technology stack</p>
          <div>
            <h2 className={rowan.className} style={{ fontFamily: rowan.style.fontFamily, fontStyle: "italic", fontWeight: 400 }}>My Expertise</h2>
            <p>Tools I use to turn thoughtful ideas into dependable digital products.</p>
          </div>
        </header>

        <div className="expertise-list">
          {personalProfile.expertise.map((item, index) => (
            <article className="expertise-item" key={item.name} style={{ animationDelay: `${index * 90}ms` }}>
              <div className={`expertise-icon icon-${item.name.toLowerCase().replace(/[^a-z]/g, "")}`}>
                <BrandIcon name={item.name} />
              </div>

              <div className="expertise-copy">
                <span className="expertise-index">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <span className="expertise-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .expertise-section {
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, .035);
        }

        .expertise-header {
          display: grid;
          grid-template-columns: 180px 1fr;
          align-items: end;
          margin-bottom: 54px;
        }

        .expertise-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 10px;
          color: #9da9b6;
          font-family: var(--font-geist-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .28em;
        }

        .expertise-kicker span {
          width: 34px;
          height: 1px;
          background: rgba(224, 233, 240, .62);
        }

        .expertise-header div {
          max-width: 720px;
        }

        .expertise-header h2 {
          margin: 0;
          font-family: inherit;
          font-size: clamp(3.4rem, 6vw, 6.8rem);
          font-style: italic;
          font-weight: 400;
          line-height: .86;
          letter-spacing: -.055em;
        }

        .expertise-header div > p {
          max-width: 520px;
          margin: 22px 0 0;
          color: #8d99a5;
          font-size: .95rem;
          line-height: 1.8;
        }

        .expertise-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-top: 1px solid rgba(225, 234, 240, .09);
        }

        .expertise-item {
          position: relative;
          min-height: 210px;
          display: grid;
          grid-template-columns: 82px minmax(0, 1fr) 28px;
          align-items: center;
          gap: 24px;
          padding: 30px 34px 30px 0;
          border-bottom: 1px solid rgba(225, 234, 240, .09);
          overflow: hidden;
          opacity: 0;
          animation: expertise-enter .8s cubic-bezier(.2,.75,.25,1) forwards;
          transition: transform .35s ease, background .35s ease;
        }

        .expertise-item:nth-child(odd) {
          border-right: 1px solid rgba(225, 234, 240, .09);
          padding-right: 34px;
        }

        .expertise-item:nth-child(even) {
          padding-left: 34px;
        }

        .expertise-item::before {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -1px;
          height: 1px;
          background: rgba(224, 234, 241, .5);
          transition: right .55s cubic-bezier(.2,.75,.25,1);
        }

        .expertise-item:nth-child(even)::before {
          left: 34px;
        }

        .expertise-item:hover {
          background: rgba(255, 255, 255, .012);
          transform: translateY(-3px);
        }

        .expertise-item:hover::before {
          right: 0;
        }

        .expertise-icon {
          width: 82px;
          height: 82px;
          display: grid;
          place-items: center;
          filter: saturate(.92);
          transition: transform .45s cubic-bezier(.2,.75,.25,1), filter .35s ease;
        }

        .expertise-icon :global(svg) {
          width: 72px;
          height: 72px;
          overflow: visible;
        }

        .expertise-item:hover .expertise-icon {
          transform: translateY(-4px) rotate(-3deg) scale(1.04);
          filter: saturate(1.12) drop-shadow(0 8px 18px rgba(255,255,255,.035));
        }

        .icon-reactjs :global(svg),
        .icon-reactnative :global(svg) {
          filter: drop-shadow(0 0 12px rgba(97, 218, 251, .09));
        }

        .icon-javascript :global(svg) {
          filter: drop-shadow(0 0 12px rgba(247, 223, 30, .07));
        }

        .icon-angular :global(svg) {
          filter: drop-shadow(0 0 12px rgba(221, 0, 49, .09));
        }

        .icon-nodejs :global(svg) {
          filter: drop-shadow(0 0 12px rgba(104, 160, 99, .09));
        }

        .expertise-copy {
          min-width: 0;
        }

        .expertise-index {
          display: block;
          margin-bottom: 9px;
          color: #66727d;
          font-family: var(--font-geist-mono);
          font-size: 8px;
          letter-spacing: .16em;
        }

        .expertise-copy h3 {
          margin: 0;
          color: #f4f7f8;
          font-family: var(--font-manrope);
          font-size: clamp(1.22rem, 1.8vw, 1.48rem);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -.035em;
        }

        .expertise-copy p {
          max-width: 380px;
          margin: 13px 0 0;
          color: #929da7;
          font-size: .82rem;
          line-height: 1.75;
        }

        .expertise-arrow {
          align-self: start;
          margin-top: 10px;
          color: #65717b;
          font-family: var(--font-geist-mono);
          font-size: 13px;
          opacity: .65;
          transition: color .3s ease, transform .35s ease, opacity .3s ease;
        }

        .expertise-item:hover .expertise-arrow {
          color: #d9e2e7;
          opacity: 1;
          transform: translate(3px, -3px);
        }

        @keyframes expertise-enter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1023px) {
          .expertise-header { grid-template-columns: 155px 1fr; }
          .expertise-item { grid-template-columns: 68px minmax(0,1fr) 20px; gap: 17px; min-height: 190px; padding-right: 20px; }
          .expertise-item:nth-child(odd) { padding-right: 20px; }
          .expertise-item:nth-child(even) { padding-left: 20px; }
          .expertise-item:nth-child(even)::before { left: 20px; }
          .expertise-icon { width: 68px; height: 68px; }
          .expertise-icon :global(svg) { width: 62px; height: 62px; }
        }

        @media (max-width: 767px) {
          .expertise-header { display: block; margin-bottom: 38px; }
          .expertise-kicker { margin-bottom: 26px; }
          .expertise-header h2 { font-size: clamp(3.35rem, 15vw, 5.3rem); }
          .expertise-header div > p { margin-top: 18px; }
          .expertise-list { grid-template-columns: 1fr; }
          .expertise-item,
          .expertise-item:nth-child(odd),
          .expertise-item:nth-child(even) {
            min-height: 168px;
            grid-template-columns: 64px minmax(0,1fr) 18px;
            gap: 15px;
            padding: 24px 6px 24px 0;
            border-right: 0;
          }
          .expertise-item:nth-child(even)::before { left: 0; }
          .expertise-icon { width: 64px; height: 64px; }
          .expertise-icon :global(svg) { width: 58px; height: 58px; }
          .expertise-copy p { max-width: 420px; font-size: .78rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .expertise-item { opacity: 1; animation: none; }
          .expertise-item,
          .expertise-icon,
          .expertise-arrow,
          .expertise-item::before { transition: none; }
        }
      `}</style>
    </section>
  );
}
