import {
  Atom, BookOpen, Brain, BriefcaseBusiness, Calculator, Clock3, Code2, FlaskConical,
  Globe2, GraduationCap, HeartPulse, Laptop, Leaf, Lightbulb, MessageCircle,
  Palette, Pencil, Users, Monitor, type LucideIcon,
} from "lucide-react";

const iconChoices: { key: string; label: string; Icon: LucideIcon }[] = [
  { key: "laptop", label: "Technology", Icon: Laptop },
  { key: "code", label: "Programming", Icon: Code2 },
  { key: "calculator", label: "Mathematics", Icon: Calculator },
  { key: "book", label: "Languages & reading", Icon: BookOpen },
  { key: "chat", label: "Communication", Icon: MessageCircle },
  { key: "globe", label: "Social studies", Icon: Globe2 },
  { key: "flask", label: "Chemistry", Icon: FlaskConical },
  { key: "atom", label: "Physics", Icon: Atom },
  { key: "leaf", label: "Biology", Icon: Leaf },
  { key: "palette", label: "Art & design", Icon: Palette },
  { key: "pencil", label: "Writing", Icon: Pencil },
  { key: "users", label: "Teamwork", Icon: Users },
  { key: "lightbulb", label: "Ideas & innovation", Icon: Lightbulb },
  { key: "business", label: "Business", Icon: BriefcaseBusiness },
  { key: "health", label: "Health", Icon: HeartPulse },
  { key: "clock", label: "Time management", Icon: Clock3 },
  { key: "brain", label: "Psychology", Icon: Brain },
  { key: "monitor", label: "Web development", Icon: Monitor },
  { key: "graduation", label: "Other", Icon: GraduationCap },
];

export function SubjectIcon({ name, icon, className = "size-5" }: { name: string; icon?: string; className?: string }) {
  const n = name.toLowerCase();
  const key = (icon && iconChoices.some((item) => item.key === icon) ? icon : (
    /program|coding|java|software/.test(n) ? "code" :
    /math|statistics|algebra/.test(n) ? "calculator" :
    /chem/.test(n) ? "flask" :
    /physic/.test(n) ? "atom" :
    /bio|ecology|environment/.test(n) ? "leaf" :
    /english|norwegian|language|literature|reading/.test(n) ? "book" :
    /social|geography|politic|society/.test(n) ? "globe" :
    /art|design|creative/.test(n) ? "palette" :
    /writing|essay/.test(n) ? "pencil" :
    /team|group|collab/.test(n) ? "users" :
    /business|econom|finance/.test(n) ? "business" :
    /health|nursing|medicine/.test(n) ? "health" :
    /time|management|planning/.test(n) ? "clock" :
    /psych/.test(n) ? "brain" :
    /web|internet|frontend/.test(n) ? "monitor" :
    /history|humanities/.test(n) ? "graduation" :
    /information technology|technology|computer|it\b/.test(n) ? "laptop" : "book"
  ));
  const choice = iconChoices.find((item) => item.key === key) ?? iconChoices[3];
  const Icon = choice.Icon;
  return <span className={`inline-grid shrink-0 place-items-center rounded-xl bg-white/70 text-[#65558f] ring-1 ring-black/5 ${className}`} aria-hidden="true"><Icon className="size-[62%]" strokeWidth={2.1} /></span>;
}

export function SubjectIconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
    {iconChoices.map(({ key, label, Icon }) => <button type="button" key={key} title={label} aria-label={label} aria-pressed={value === key} onClick={() => onChange(key)} className={`grid aspect-square place-items-center rounded-xl border transition hover:-translate-y-0.5 hover:bg-secondary ${value === key ? "border-primary bg-secondary shadow-sm" : "border-border bg-card"}`}>
      <Icon className="size-6 text-[#65558f]" strokeWidth={2.1} />
    </button>)}
  </div>;
}
