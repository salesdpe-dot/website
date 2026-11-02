import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/home/CountUp";
import { brand } from "@/lib/content";
import { ArrowRight } from "./Icons";
import { HomeMark } from "./Logo";
import s from "./ProofPanel.module.css";

/*
 * The brand band, as the guideline's own Color Palette page: a navy field, "come home" huge in sky blue, the house
 * icon on its own as a graphic, and the record as large figures: the homes handed over, the communities, the
 * residents' rating and the ET award with its certificate.
 */
export function ProofPanel() {
  return (
    <section id="record" className={s.band} data-tone="dark" aria-labelledby="brand-title">
      <HomeMark className={s.watermark} />
      <div className={s.inner}>
        <div className={`${s.lead} reveal`}>
          <HomeMark className={s.mark} />
          <h2 id="brand-title" className={s.tagline}>
            {brand.tagline}
            <span className="sr-only">: Disha Habitat since 2014</span>
          </h2>
          <p className={s.line}>{brand.line}</p>
        </div>

        <dl className={`${s.figures} reveal-stagger`}>
          {brand.figures.map((f) => (
            <div key={f.label} className={s.figure}>
              <dt className={s.label}>
                {f.label}
                {"note" in f && (
                  <sup>
                    <a href={`#note-${f.note}`} aria-label={`Note ${f.note}`}>
                      {f.note}
                    </a>
                  </sup>
                )}
              </dt>
              <dd className={s.value}>
                <CountUp value={f.value} />
              </dd>
            </div>
          ))}
          <div className={`${s.figure} ${s.award}`}>
            <dt className={s.label}>
              {brand.award.honour}, {brand.award.title}
              <span className={s.citation}>{brand.award.citation}</span>
            </dt>
            <dd className={s.certificate}>
              <Image
                src={brand.award.image.src}
                alt={brand.award.image.alt}
                width={brand.award.image.width}
                height={brand.award.image.height}
                sizes="240px"
                quality={82}
              />
            </dd>
          </div>
        </dl>

        <Link className={s.link} href={brand.link.href}>
          {brand.link.label} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
