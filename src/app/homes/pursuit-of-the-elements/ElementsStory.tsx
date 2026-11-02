import Image from "next/image";
import { elements as e } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import s from "./ElementsStory.module.css";

/*
 * The five elements, told as you scroll. On a computer with motion allowed, a track a little over a screen and a
 * half holds a sticky stage: each word grows to the front in turn while its picture fades up behind it, named at
 * the foot, and a sky-blue line fills. Everywhere else it is the heading, the sentence and the five pictures as a
 * row of cards to swipe, each with its word and its place.
 */
export function ElementsStory() {
  return (
    <section className={s.story} data-tone="dark" aria-labelledby="idea-title">
      <div className={s.track}>
        <div className={s.stage}>
          <ul className={s.pictures}>
            {e.fiveElements.map((el, i) => {
              const p = e.elementPictures[el]!;
              return (
                <li key={el} className={s.picture}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={i === 0 ? "100vw" : "(min-width: 900px) 100vw, 50vw"}
                    quality={75}
                    className={s.img}
                    style={focusPoint(p)}
                  />
                  <span className={s.label}>
                    <span className={s.element}>{el}</span> <span className={s.place}>{p.caption}</span>
                  </span>
                  <span className={s.note}>Artist’s impression</span>
                </li>
              );
            })}
          </ul>
          {/* In the story, the place named at the foot, above the shade (the pictures' own alt text already says it). */}
          <ul className={s.places} aria-hidden="true">
            {e.fiveElements.map((el) => (
              <li key={el}>{e.elementPictures[el]!.caption}</li>
            ))}
          </ul>
          <div className={s.inner}>
            <div className={s.words} aria-hidden="true">
              <span className={s.rail}>
                <span className={s.fill} />
              </span>
              <ul className={`display ${s.list}`}>
                {e.fiveElements.map((el) => (
                  <li key={el} className={s.word}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.copy}>
              <h2 id="idea-title" className={s.kicker}>
                The five elements
              </h2>
              <p className={`display ${s.sentence}`}>
                Space is the Central arena. Fire, the camping zone’s fire pit. Air, the yoga deck. Water, the Elements plaza.
                Earth, the mound.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
