import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const lineItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  const [hasClickedYes, setHasClickedYes] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const s1 = useInView(0.4);
  const s2 = useInView(0.3);
  const s3 = useInView(0.3);
  const s4 = useInView(0.25);
  const s5 = useInView(0.25);

  const evadeButton = () => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 100;
    setNoPos({ x, y });
  };

  const handleYes = async () => {
    try {
      await fetch("/api/response", { method: "POST" });
    } catch {
      // best-effort — don't block the UI
    }
    setHasClickedYes(true);
  };

  return (
    <div className="relative bg-background text-foreground overflow-x-hidden font-sans">
      <div className="film-grain" />

      {/* ── Section 1: Title Card ── */}
      <section
        ref={s1.ref as React.RefObject<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={s1.inView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            A Story About Us
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-6xl md:text-8xl font-medium tracking-tight text-foreground mb-8 leading-none"
          >
            The Plot Twist
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed"
          >
            You know how in every romantic comedy there's that one moment where everything suddenly makes sense?
          </motion.p>
          <motion.div variants={fadeUp} className="mt-16">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-bounce">
              Keep scrolling
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Section 2: The Build-Up ── */}
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={s2.inView ? "visible" : "hidden"}
          className="max-w-3xl space-y-10"
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl md:text-5xl italic text-primary"
          >
            It started like they always do...
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground"
          >
            A couple of casual conversations. A few shared jokes. Nothing crazy. Just the kind of quiet,
            unassuming start that you don't realise is important until much, much later.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground"
          >
            We've talked very little — I barely know you, and you barely know me. We haven't even shared that much yet.
            It's funny, honestly. But I had to say this: you are the sweetest person I have ever talked to.
            And if I ever bring up your eyes — just know, I've already fallen the hardest. Nothing's stopping me anymore.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Section 3: 10 Things I Noticed ── */}
      <section
        ref={s3.ref as React.RefObject<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={s3.inView ? "visible" : "hidden"}
          className="max-w-4xl w-full"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-14 text-center"
          >
            Things I Noticed — In No Particular Order
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              "The way you completely light up when you talk about the movies you love.",
              "How you always know exactly what to say to make a moment better.",
              "The fact that I started looking forward to hearing from you. Every single day.",
              "How easy it is to just… talk to you.",
            ].map((line, i) => (
              <motion.div
                key={i}
                variants={lineItem}
                className={`border-border ${
                  i % 2 === 0
                    ? "md:text-right md:border-r md:pr-10"
                    : "md:text-left md:border-l md:pl-10"
                } pb-4`}
              >
                <p className="font-serif italic text-lg md:text-xl text-primary/80 leading-relaxed">
                  {line}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Section 4: The Confession ── */}
      <section
        ref={s4.ref as React.RefObject<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={s4.inView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl md:text-6xl mb-10 leading-tight"
          >
            So here is the part where the guy finally says it.
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-5 text-xl font-light text-muted-foreground mb-14">
            <p>I could have tried to play it cool. I could have waited for the "perfect" moment.</p>
            <p>But in every good rom-com, the perfect moment is the one where you stop waiting and just say it.</p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-handwriting text-4xl md:text-5xl text-primary mb-10"
            style={{ fontFamily: "'Caveat', cursive", transform: "rotate(-1.5deg)" }}
          >
            I like you. A lot. And I'd love to take you out.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed mb-14 max-w-xl mx-auto"
          >
            I really want to know you — every bit of you. I don't care if it takes months, years, or a lifetime.
            I'll always put in the effort. And I know what boundaries mean — I'll respect yours, every single one.
            So take all the time you need. There's no rush here. None at all.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Section 5: The Answer ── */}
      <section
        ref={s5.ref as React.RefObject<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={s5.inView ? "visible" : "hidden"}
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-10"
          >
            The only question left
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="text-left bg-muted/30 border border-border/40 rounded-2xl px-7 py-6 mb-12 space-y-4 text-base md:text-lg font-light text-muted-foreground leading-relaxed"
          >
            <p>
              I want to be clear — I'm not rushing into anything either. I just made this because
              I needed to get this feeling out somewhere. You've got a bit of me and I don't even
              know how that happened.
            </p>
            <p>
              I'm not the flirty type. I genuinely don't know how to approach things like this,
              so please bear with me. Talking to you is a rollercoaster — every reply from you
              feels like the best part of the day, and then I go and overthink all of it.
            </p>
            <p>
              Sorry for putting all of this on you. You didn't ask for it. But it felt wrong to
              keep it to myself any longer.
            </p>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-4xl mb-14"
          >
            So, what do you say?
          </motion.h2>

          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              {!hasClickedYes ? (
                <motion.div
                  key="buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                  <button
                    onClick={handleYes}
                    className="rounded-full px-10 py-4 text-lg font-serif bg-primary text-primary-foreground hover:opacity-90 transition-opacity active:scale-95"
                  >
                    I'd like that
                  </button>
                  <motion.button
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={evadeButton}
                    onTouchStart={(e) => { e.preventDefault(); evadeButton(); }}
                    className="rounded-full px-10 py-4 text-lg font-serif border border-muted-foreground/30 text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Let me think about it
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="yes"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-16 h-16 text-primary fill-primary" />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-primary">Best plot twist ever.</h3>
                  <p className="text-muted-foreground font-light">I'll reach out and we'll figure out the details.</p>
                  <p className="text-muted-foreground/70 font-light text-sm max-w-xs mx-auto leading-relaxed">
                    And please — don't rush. Don't feel overwhelmed. There's nothing going on, nothing expected.
                    This is just fun, and I can keep it that way — in the cutest way possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer credit */}
      <footer className="text-center py-16 px-6 space-y-3">
        <p className="font-serif italic text-muted-foreground/60 text-lg">
          This has no colors right now — because you're the one who fills them in, slowly.
        </p>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground/30">
          Made with something that felt a lot like courage
        </p>
      </footer>
    </div>
  );
}
