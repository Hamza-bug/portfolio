"use client";

import {
  ArrowUpRight,
  Blocks,
  Globe2,
  LayoutDashboard,
  PanelsTopLeft,
  ServerCog,
  Smartphone,
} from "lucide-react";

import { rowan } from "@/app/fonts/rowan";

const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Modern, responsive business websites focused on performance, user experience and professional brand presence.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Web Application Development",
    description:
      "Dynamic web applications, dashboards and business platforms designed to simplify complex workflows.",
    icon: LayoutDashboard,
  },
  {
    number: "03",
    title: "Mobile Application Development",
    description:
      "Cross-platform mobile applications with intuitive interfaces and practical functionality using React Native.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "Frontend Development",
    description:
      "Responsive, interactive interfaces built with React, Angular and Next.js, with attention to detail and usability.",
    icon: PanelsTopLeft,
  },
  {
    number: "05",
    title: "Backend Development",
    description:
      "Server-side functionality, APIs, integrations and application logic using Node.js.",
    icon: ServerCog,
  },
  {
    number: "06",
    title: "Custom Software Development",
    description:
      "Tailored business solutions such as POS systems, inventory management and order management platforms.",
    icon: Blocks,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" data-reveal className="services-section py-24 md:py-32">
      <div className="section-shell">
        <header className="services-header">
          <p className="services-kicker">
            <span /> What I do
          </p>
          <div>
            <h2
              className={rowan.className}
              style={{
                fontFamily: rowan.style.fontFamily,
                fontStyle: "italic",
                fontWeight: 400,
                wordSpacing: "0.16em",
              }}
            >
              WHAT I CAN BUILD
            </h2>
            <p>
              From digital experiences to powerful business applications, I turn
              ideas into practical software solutions.
            </p>
          </div>
        </header>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.35} />
                  </span>
                </div>

                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="service-card-footer" aria-hidden="true">
                  <span />
                  <ArrowUpRight size={16} strokeWidth={1.35} />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .services-section {
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.035);
        }

        .services-header {
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr);
          align-items: end;
          margin-bottom: 44px;
        }

        .services-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 8px;
          color: #9da9b6;
          font-family: var(--font-geist-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.28em;
        }

        .services-kicker span {
          width: 34px;
          height: 1px;
          background: rgba(224, 233, 240, 0.62);
        }

        .services-header h2 {
          margin: 0;
          font-family: inherit;
          font-size: clamp(3.1rem, 5vw, 5.4rem);
          font-style: italic;
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: -0.055em;
        }

        .services-header div > p {
          max-width: 620px;
          margin: 18px 0 0;
          color: #929da8;
          font-size: 0.95rem;
          line-height: 1.75;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .service-card {
          position: relative;
          height: 252px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 22px;
          border: 1px solid rgba(224, 234, 240, 0.09);
          background: rgba(11, 13, 17, 0.82);
          transition:
            border-color 0.35s ease,
            background 0.35s ease,
            transform 0.35s ease;
        }

        .service-card:hover {
          border-color: rgba(224, 234, 240, 0.23);
          background: rgba(14, 16, 20, 0.96);
          transform: translateY(-3px);
        }

        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .service-number {
          color: #7b8791;
          font-family: var(--font-geist-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
        }

        .service-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(224, 234, 240, 0.11);
          border-radius: 50%;
          color: #cbd5db;
          background: rgba(255, 255, 255, 0.018);
          transition:
            color 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }

        .service-card:nth-child(1) .service-icon {
          color: #b9cce0;
        }
        .service-card:nth-child(2) .service-icon {
          color: #61dafb;
        }
        .service-card:nth-child(3) .service-icon {
          color: #a9cfee;
        }
        .service-card:nth-child(4) .service-icon {
          color: #ddc8ff;
        }
        .service-card:nth-child(5) .service-icon {
          color: #68a063;
        }
        .service-card:nth-child(6) .service-icon {
          color: #d6cfa6;
        }

        .service-card:hover .service-icon {
          border-color: rgba(224, 234, 240, 0.24);
          transform: translateY(-2px);
        }

        .service-card-copy {
          margin-top: 38px;
        }

        .service-card-copy h3 {
          max-width: 300px;
          margin: 0;
          color: #edf2f4;
          font-size: clamp(1.08rem, 1.35vw, 1.28rem);
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: -0.035em;
        }

        .service-card-copy p {
          max-width: 360px;
          margin: 12px 0 0;
          color: #929da7;
          font-size: 0.82rem;
          line-height: 1.72;
        }

        .service-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 18px;
          color: #7b8791;
        }

        .service-card-footer span {
          width: 28px;
          height: 1px;
          background: rgba(224, 234, 240, 0.16);
          transition: width 0.35s ease, background 0.35s ease;
        }

        .service-card:hover .service-card-footer span {
          width: 46px;
          background: rgba(224, 234, 240, 0.38);
        }

        .service-card-footer :global(svg) {
          transition: transform 0.35s ease, color 0.35s ease;
        }

        .service-card:hover .service-card-footer :global(svg) {
          color: #dce4e8;
          transform: translate(2px, -2px);
        }

        @media (max-width: 1023px) {
          .services-header {
            grid-template-columns: 155px minmax(0, 1fr);
          }
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .services-header {
            display: block;
          }
          .services-kicker {
            margin-bottom: 24px;
          }
          .services-header h2 {
            font-size: clamp(2.7rem, 13vw, 4.2rem);
          }
          .services-header div > p {
            margin-top: 16px;
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
          .service-card {
            height: 252px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-icon,
          .service-card-footer span,
          .service-card-footer :global(svg) {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
