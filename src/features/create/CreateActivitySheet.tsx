import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GlassButton, GlassCard } from "../../ui/Glass";
import { useToast } from "../../ui/Toast";

type Category = "Shopping" | "Coffee" | "Food" | "Movies" | "Walk";

const CATEGORIES: Array<{ key: Category; icon: string }> = [
  { key: "Shopping", icon: "🛍️" },
  { key: "Coffee", icon: "☕" },
  { key: "Food", icon: "🍽️" },
  { key: "Movies", icon: "🎬" },
  { key: "Walk", icon: "🚶" },
];

export function CreateActivitySheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const [category, setCategory] = useState<Category>("Coffee");
  const [location, setLocation] = useState("");
  const [dt, setDt] = useState("");
  const [genderPref, setGenderPref] = useState<"Any" | "Women" | "Men">("Any");
  const [plan, setPlan] = useState("");

  const canPublish = useMemo(
    () => location.trim().length >= 3 && plan.trim().length >= 10,
    [location, plan],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-white/30 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="mx-auto w-full max-w-md px-4 pb-6">
              <GlassCard className="glass-strong glass-inner-border rounded-t-3xl p-4">
                <div className="flex items-start justify-between">
                  <div className="w-full">
                    <div className="mx-auto h-1.5 w-12 rounded-full bg-zinc-900/15" />
                    <div className="mt-4 text-lg font-semibold text-zinc-900">
                      Create Activity
                    </div>
                    <div className="mt-1 text-sm text-zinc-600">
                      Publish a plan people can join.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="glass glass-inner-border ml-3 rounded-xl px-2 py-1 text-xs font-semibold text-zinc-800"
                  >
                    Close
                  </button>
                </div>

                {/* Categories */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-900">
                    Category
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {CATEGORIES.map((c) => {
                      const selected = c.key === category;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setCategory(c.key)}
                          className={[
                            "glass glass-inner-border rounded-2xl px-2 py-2 text-center",
                            selected
                              ? "bg-white/55 border-white/40"
                              : "hover:bg-white/45",
                          ].join(" ")}
                          aria-pressed={selected}
                        >
                          <div className="text-lg">{c.icon}</div>
                          <div className="mt-1 text-[10px] font-semibold text-zinc-800">
                            {c.key}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-900">
                    Location
                  </div>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search a place…"
                    className="mt-2 w-full rounded-2xl border border-white/30 bg-white/35 px-3 py-3 text-sm text-zinc-900 backdrop-blur-2xl outline-none placeholder:text-zinc-500"
                  />
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {["Seasons Mall", "FC Road", "Phoenix Marketcity"].map((x) => (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setLocation(x)}
                        className="glass glass-inner-border whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-zinc-900"
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date/Time */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-900">
                    Date / Time
                  </div>
                  <input
                    type="datetime-local"
                    value={dt}
                    onChange={(e) => setDt(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/30 bg-white/35 px-3 py-3 text-sm text-zinc-900 backdrop-blur-2xl outline-none"
                  />
                </div>

                {/* Gender Preference */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-900">
                    Gender Preference
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["Any", "Women", "Men"] as const).map((g) => {
                      const selected = g === genderPref;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGenderPref(g)}
                          className={[
                            "glass glass-inner-border rounded-2xl px-3 py-3 text-sm font-semibold",
                            selected
                              ? "bg-white/55 border-white/40 text-zinc-900"
                              : "text-zinc-700",
                          ].join(" ")}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Plan */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-900">
                    The Plan
                  </div>
                  <textarea
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    placeholder="Describe the plan / itinerary…"
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-white/30 bg-white/35 p-3 text-sm text-zinc-900 backdrop-blur-2xl outline-none placeholder:text-zinc-500"
                  />
                </div>

                <GlassButton
                  disabled={!canPublish}
                  onClick={() => {
                    toast.push("Published Plan");
                    onClose();
                  }}
                  className={
                    canPublish
                      ? "mt-5 w-full bg-[#1A1A1A] text-white border-white/10 shadow-glassStrong py-3 rounded-2xl"
                      : "mt-5 w-full py-3 rounded-2xl"
                  }
                >
                  Publish Plan
                </GlassButton>

                <div className="mt-3 text-center text-[11px] text-zinc-600">
                  Category: <span className="font-semibold">{category}</span>{" "}
                  · Pref: <span className="font-semibold">{genderPref}</span>
                  {dt ? (
                    <>
                      {" "}
                      ·{" "}
                      <span className="font-semibold">
                        {new Date(dt).toLocaleString()}
                      </span>
                    </>
                  ) : null}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}




