import Image from "next/image";
import type { Img } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { type Cta, CtaLink } from "./CtaLink";
import s from "./CtaBand.module.css";

type Props = {
  title: string;
  line?: string;
  actions: Cta[];
  id?: string;
  /* A picture beside the words, such as the project on sale. */
  image?: Img;
  /* Small print in the picture's corner, such as "Artist’s impression". */
  note?: string;
};

/*
 * A page ends on its one action, set as the guideline's sky-blue block (page 5): the invitation large in navy,
 * two buttons, and optionally a picture. Navy on sky reads at 6.9:1. The block runs into the navy footer below
 * it, the two brand colours side by side; the footer carries the "come home" signature, so this block does not.
 */
export function CtaBand({ title, line, actions, id = "cta-title", image, note }: Props) {
  return (
    <section className={s.section} aria-labelledby={id} data-flush-end="" data-has-image={image ? "" : undefined}>
      <div className={s.inner}>
        <div className={s.copy}>
          <h2 id={id} className={`display ${s.title}`}>
            {title}
          </h2>
          {line && <p className={s.line}>{line}</p>}
          <div className={s.buttons}>
            {actions.map((a, i) => (
              <CtaLink key={a.label} href={a.href} className={`btn ${i === 0 ? "btn-dark" : "btn-white"}`}>
                {a.label}
              </CtaLink>
            ))}
          </div>
        </div>
        {image && (
          <div className={s.media}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={75}
              className={s.img}
              style={focusPoint(image)}
            />
            {note && <span className={s.note}>{note}</span>}
          </div>
        )}
      </div>
    </section>
  );
}
