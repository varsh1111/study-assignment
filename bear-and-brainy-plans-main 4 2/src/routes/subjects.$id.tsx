import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlanner, progressOf, subjectColor } from "@/lib/planner";
import { SubjectIcon } from "@/components/SubjectIcon";
import { AssignmentRow, AddAssignmentForm } from "@/components/AssignmentList";
import { SubjectStudyProgress, SessionDialog, SessionList } from "@/components/StudyWidgets";

export const Route = createFileRoute("/subjects/$id")({
  head: () => ({
    meta: [
      { title: "Subject — Study Space Study Planner" },
      { name: "description", content: "Manage assignments and track progress for this subject." },
      { property: "og:title", content: "Subject — Study Space Study Planner" },
      { property: "og:description", content: "Manage assignments and track progress for this subject." },
    ],
  }),
  component: SubjectPage,
});

function SubjectPage() {
  const { id } = Route.useParams();
  const { subjects, assignments, removeSubject, updateSubject } = usePlanner();
  const nav = useNavigate();
  const s = subjects.find((x) => x.id === id);
  if (!s) return <p className="text-muted-foreground">Subject not found. <Link to="/" className="underline">Back to dashboard</Link></p>;

  const list = assignments.filter((a) => a.subjectId === id).sort((a, b) => Number(a.done) - Number(b.done) || a.due.localeCompare(b.due));
  const p = progressOf(list);

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center gap-6 rounded-3xl border bg-card p-8 shadow-soft">
        <div className="grid size-20 place-items-center rounded-2xl" style={{ background: `color-mix(in oklab, ${subjectColor(s.color)} 20%, transparent)` }}><SubjectIcon name={s.name} icon={s.emoji} className="size-14 rounded-xl" /></div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{s.name}</h1>
          <p className="text-muted-foreground">{list.filter((a) => a.done).length} of {list.length} tasks done</p>
          <div className="mt-3 h-3 max-w-sm overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full transition-all" style={{ width: `${p}%`, background: subjectColor(s.color) }} />
          </div>
        </div>
        <div className="font-display text-5xl font-bold" style={{ color: subjectColor(s.color) }}>{p}%</div>
      </section>

      <section className="space-y-4 rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="text-xl font-bold">Study time & progress</h2><p className="text-sm text-muted-foreground">Track the time you spend learning this subject.</p></div>
          <SessionDialog subjectId={id} />
        </div>
        <SubjectStudyProgress subjectId={id} />
        <div className="border-t pt-4"><h3 className="mb-3 font-semibold">Study sessions</h3><SessionList subjectId={id} /></div>
      </section>

      <section className="space-y-4 rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><BookOpenText className="size-5" /></div>
          <div>
            <h2 className="text-xl font-bold">Subject notepad</h2>
            <p className="text-sm text-muted-foreground">Keep reminders, useful links and things to remember for {s.name}.</p>
          </div>
        </div>
        <textarea
          aria-label={`${s.name} subject notes`}
          value={s.notes ?? ""}
          onChange={(event) => updateSubject(id, { notes: event.target.value })}
          placeholder={`Write anything you want to remember about ${s.name}...`}
          rows={6}
          className="w-full resize-y rounded-xl border border-input bg-background px-3 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="text-xs text-muted-foreground">Your notes save automatically in this browser.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Assignments & deadlines</h2>
        <AddAssignmentForm subjectId={id} />
        <div className="space-y-2">
          {list.length === 0 && <p className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">No assignments yet — add your first one above.</p>}
          {list.map((a) => <AssignmentRow key={a.id} a={a} />)}
        </div>
      </section>

      <Button variant="ghost" className="text-destructive" onClick={() => { if (confirm(`Delete ${s.name} and its assignments?`)) { removeSubject(id); nav({ to: "/" }); } }}>
        <Trash2 />Delete subject
      </Button>
    </div>
  );
}
