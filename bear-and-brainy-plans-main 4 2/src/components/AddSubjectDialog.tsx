import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePlanner } from "@/lib/planner";
import { SubjectIconPicker } from "@/components/SubjectIcon";

export function AddSubjectDialog({ children }: { children: ReactNode }) {
  const { addSubject } = usePlanner();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("book");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const s = addSubject(name.trim(), emoji);
    setName(""); setEmoji("book"); setOpen(false);
    nav({ to: "/subjects/$id", params: { id: s.id } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={submit} className="space-y-5">
          <DialogHeader><DialogTitle>Add a new subject</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="sname">Subject name</Label>
            <Input id="sname" autoFocus placeholder="e.g. Chemistry" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Pick an icon</Label>
            <SubjectIconPicker value={emoji} onChange={setEmoji} />
          </div>
          <DialogFooter><Button type="submit" disabled={!name.trim()}>Add subject</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
