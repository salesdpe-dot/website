import s from "./Quote.module.css";

/*
 * A homeowner's own words, set as a real quotation: a large sky-blue opening mark (a graphic, so the pale blue
 * is fine on white), the words in Montserrat, and who said it with where they are from.
 */
export function Quote({ quote, name, detail, place }: { quote: string; name: string; detail?: string; place?: string }) {
  return (
    <figure className={`reveal ${s.figure}`}>
      <span className={s.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={`display ${s.quote}`}>
        <p>{quote.replace(/^“|”$/g, "")}</p>
      </blockquote>
      <figcaption className={s.caption}>
        <span className={s.name}>{name}</span>
        {detail && <span>{detail}</span>}
        {place && <span className={s.place}>{place}</span>}
      </figcaption>
    </figure>
  );
}
