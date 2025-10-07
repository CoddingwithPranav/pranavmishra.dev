import { getAboutMe } from "@/app/actions/aboutMe";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/app/actions/educations";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiSave,
  FiEdit2,
  FiTrash2,
  FiAward,
  FiCalendar,
  FiX,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EducationSection() {
  const [educations, setEducations] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  });
  const [aboutMeId, setAboutMeId] = useState("");

  /* ------------------------------------------------------------------ */
  /* Load data */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutResult = await getAboutMe();
    if (aboutResult.success && aboutResult.data) {
      setAboutMeId(aboutResult.data.id);
      const eduResult = await getEducations(aboutResult.data.id);
      if (eduResult.success) {
        setEducations(eduResult.data || []);
      }
    }
  };

  /* ------------------------------------------------------------------ */
  /* Form helpers */
  /* ------------------------------------------------------------------ */
  const resetForm = () => {
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
    });
    setShowAdd(false);
    setEditing(null);
  };

  const handleAdd = async () => {
    if (!formData.school || !formData.degree || !aboutMeId) return;
    const result = await createEducation({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      aboutMeId,
    });
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleUpdate = async (id: string) => {
    const result = await updateEducation(id, {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    });
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education?")) {
      await deleteEducation(id);
      loadData();
    }
  };

  const startEdit = (edu: any) => {
    setEditing(edu.id);
    setFormData({
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: new Date(edu.startDate).toISOString().split("T")[0],
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : "",
      grade: edu.grade || "",
      description: edu.description || "",
    });
  };

  /* ------------------------------------------------------------------ */
  /* Render */
  /* ------------------------------------------------------------------ */
  return (
    <div className="space-y-8">
      {/* ---------- Add / Edit button (top-right) ---------- */}
      {!showAdd && !editing && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowAdd(true)}
            className={cn(
              "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90",
              "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20"
            )}
          >
            <FiPlus className="h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}

      {/* ---------- Add / Edit form (glass card) ---------- */}
      {(showAdd || editing) && (
        <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {editing ? "Edit Education" : "Add New Education"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* School */}
              <div>
                <Label className="text-foreground dark:text-foreground">
                  School/University *
                </Label>
                <Input
                  type="text"
                  value={formData.school}
                  onChange={(e) =>
                    setFormData({ ...formData, school: e.target.value })
                  }
                  placeholder="MIT"
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                />
              </div>

              {/* Degree */}
              <div>
                <Label className="text-foreground dark:text-foreground">
                  Degree *
                </Label>
                <Input
                  type="text"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  placeholder="Bachelor of Science"
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                />
              </div>

              {/* Field of Study */}
              <div>
                <Label className="text-foreground dark:text-foreground">
                  Field of Study *
                </Label>
                <Input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fieldOfStudy: e.target.value,
                    })
                  }
                  placeholder="Computer Science"
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                />
              </div>

              {/* Grade */}
              <div>
                <Label className="text-foreground dark:text-foreground">
                  Grade/GPA
                </Label>
                <Input
                  type="text"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  placeholder="3.8/4.0"
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div>
                  <Label className="text-foreground dark:text-foreground">
                    Start Date *
                  </Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
                <div>
                  <Label className="text-foreground dark:text-foreground">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-foreground dark:text-foreground">
                Description (HTML supported)
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows={4}
                placeholder="Additional details, achievements, courses..."
                className="mt-2 font-mono text-sm bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl focus:ring-primary/50 focus:border-primary/50"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  editing ? handleUpdate(editing) : handleAdd()
                }
                disabled={
                  !formData.school ||
                  !formData.degree ||
                  !formData.fieldOfStudy ||
                  !formData.startDate
                }
                className={cn(
                  "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90",
                  "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20"
                )}
              >
                <FiSave className="h-4 w-4" />
                {editing ? "Update" : "Add"}
              </Button>

              <Button
                variant="outline"
                onClick={resetForm}
                className={cn(
                  "rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10",
                  "hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm"
                )}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---------- List of educations (glass card) ---------- */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Education ({educations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {educations.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No education records added yet.
            </p>
          ) : (
            <div className="space-y-8">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="relative border-l-4 border-primary pl-6"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary border-4 border-white/10 dark:border-black/10" />

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <p className="text-muted-foreground">
                        {edu.fieldOfStudy}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(edu)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(edu.id)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-destructive/10 dark:hover:bg-destructive/20"
                      >
                        <FiTrash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Grade & dates */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    {edu.grade && (
                      <span className="flex items-center gap-1">
                        <FiAward className="h-3.5 w-3.5" />
                        {edu.grade}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiCalendar className="h-3.5 w-3.5" />
                      {new Date(edu.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </span>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}