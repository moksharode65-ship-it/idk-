import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, Loader } from "lucide-react";

type State =
  | { status: "loading" }
  | { status: "yes"; clickedAt: string }
  | { status: "waiting" }
  | { status: "error" };

export default function Check() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetch("/api/response")
      .then((r) => r.json())
      .then((data) => {
        if (data.answered) {
          setState({ status: "yes", clickedAt: data.clickedAt });
        } else {
          setState({ status: "waiting" });
        }
      })
      .catch(() => setState({ status: "error" }));
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <div className="film-grain" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-sm w-full"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10">
          The Answer
        </p>

        {state.status === "loading" && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader className="w-8 h-8 animate-spin" />
            <p className="font-light">Checking...</p>
          </div>
        )}

        {state.status === "yes" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-20 h-20 text-primary fill-primary" />
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">
              She said yes.
            </h1>
            <p className="font-sans text-muted-foreground font-light text-lg leading-relaxed">
              She clicked "I'd like that." Time to make it count.
            </p>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground/60 text-sm">
              <Clock className="w-4 h-4" />
              <span>{formatDate(state.clickedAt)}</span>
            </div>
          </motion.div>
        )}

        {state.status === "waiting" && (
          <div className="flex flex-col items-center gap-6 text-muted-foreground">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Clock className="w-16 h-16" />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground">
              Still waiting...
            </h1>
            <p className="font-light text-lg">
              She hasn't opened it yet — or hasn't scrolled to the end.
            </p>
            <p className="text-sm text-muted-foreground/50">Refresh this page to check again.</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="text-muted-foreground">
            <p className="font-serif text-xl">Could not reach the server.</p>
            <p className="text-sm mt-2">Try refreshing.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
