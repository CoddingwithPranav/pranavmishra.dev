import { getAboutMe } from "@/app/actions/aboutMe";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/app/actions/skills";
import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import ImageCropper from "../shared/imagecopper";

interface Skill {
  id: string;
  name: string;
  level: number;
  imageUrl?: string;
  aboutMeId: string;
  createdAt: string;
  updatedAt: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', level: 50, imageUrl: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, imageUrl: '' });
  const [aboutMeId, setAboutMeId] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutResult = await getAboutMe();
    if (aboutResult.success && aboutResult.data) {
      setAboutMeId(aboutResult.data.id);
      const skillsResult = await getSkills(aboutResult.data.id);
      if (skillsResult.success) {
        setSkills(
          (skillsResult.data || []).map((skill: any) => ({
            ...skill,
            createdAt: typeof skill.createdAt === "string" ? skill.createdAt : skill.createdAt?.toISOString?.() ?? "",
            updatedAt: typeof skill.updatedAt === "string" ? skill.updatedAt : skill.updatedAt?.toISOString?.() ?? "",
          }))
        );
      } else {
        toast.error("Failed to load skills. Please try again.");
      }
    } else {
      toast.error("Failed to load profile data. Please try again.");
    }
  };

  const handleImageChange = (file: File | null, preview: string, isEdit: boolean) => {
    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("Image size exceeds 10MB limit.");
      return;
    }
    if (isEdit) {
      setEditFile(file);
      setEditData({ ...editData, imageUrl: preview });
    } else {
      setNewFile(file);
      setNewSkill({ ...newSkill, imageUrl: preview });
    }
    if (file) {
      toast.success("Image selected successfully!");
    }
  };

  const handleAdd = async () => {
    if (!newSkill.name || !aboutMeId) {
      toast.error("Skill name is required.");
      return;
    }

    try {
      let imageUrl = newSkill.imageUrl;

      // Upload image if a file is selected
      if (newFile) {
        const formData = new FormData();
        formData.append("file", newFile);

        const uploadResponse = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }
        imageUrl = uploadResult.url;
      }

      const result = await toast.promise(
        createSkill({ ...newSkill, imageUrl, aboutMeId }),
        {
          loading: "Adding skill...",
          success: "Skill added successfully!",
          error: "Failed to add skill. Please try again.",
        }
      );

      if (result.success) {
        setNewSkill({ name: '', level: 50, imageUrl: '' });
        setNewFile(null);
        loadData();
      }
    } catch (error: any) {
      console.error('Add skill error:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editData.name) {
      toast.error("Skill name is required.");
      return;
    }

    try {
      let imageUrl = editData.imageUrl;

      // Upload image if a file is selected
      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);

        const uploadResponse = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }
        imageUrl = uploadResult.url;
      }

      const result = await toast.promise(
        updateSkill(id, { ...editData, imageUrl }),
        {
          loading: "Updating skill...",
          success: "Skill updated successfully!",
          error: "Failed to update skill. Please try again.",
        }
      );

      if (result.success) {
        setEditing(null);
        setEditFile(null);
        loadData();
      }
    } catch (error: any) {
      console.error('Update skill error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await toast.promise(
          deleteSkill(id),
          {
            loading: "Deleting skill...",
            success: "Skill deleted successfully!",
            error: "Failed to delete skill. Please try again.",
          }
        );
        loadData();
      } catch (error: any) {
        console.error('Delete skill error:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Toaster Component */}
    
      {/* Add New Skill */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl flex items-center gap-2">
            <FiPlus className="h-6 w-6" />
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="newSkillName" className="text-foreground dark:text-foreground">Skill Name</Label>
              <Input
                id="newSkillName"
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                placeholder="e.g., React, TypeScript, Design"
              />
            </div>
            <div>
              <Label htmlFor="newSkillLevel" className="text-foreground dark:text-foreground">Proficiency Level</Label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  id="newSkillLevel"
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="flex-1 accent-primary h-2 rounded-full"
                />
                <span className="text-foreground dark:text-foreground font-semibold w-16 text-right">{newSkill.level}%</span>
              </div>
            </div>
            <div>
              <ImageCropper
                value={newSkill.imageUrl}
                onChange={(file, preview) => handleImageChange(file, preview, false)}
                label="Skill Image"
                aspectRatio={1}
                className="mt-2"
              />
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={!newSkill.name}
            className={cn(
              "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70",
              "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20 transition-all duration-300"
            )}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Skill</span>
          </Button>
        </CardContent>
      </Card>

      {/* Skills List */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
            Your Skills ({skills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground dark:text-muted-foreground">No skills added yet. Add your first skill above!</p>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
                >
                  {editing === skill.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                          <Label htmlFor={`editSkillName-${skill.id}`} className="text-foreground dark:text-foreground">Skill Name</Label>
                          <Input
                            id={`editSkillName-${skill.id}`}
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`editSkillLevel-${skill.id}`} className="text-foreground dark:text-foreground">Proficiency Level</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <input
                              id={`editSkillLevel-${skill.id}`}
                              type="range"
                              min="0"
                              max="100"
                              value={editData.level}
                              onChange={(e) => setEditData({ ...editData, level: parseInt(e.target.value) })}
                              className="flex-1 accent-primary h-2 rounded-full"
                            />
                            <span className="text-foreground dark:text-foreground font-semibold w-16 text-right">{editData.level}%</span>
                          </div>
                        </div>
                        <div>
                          <ImageCropper
                            value={editData.imageUrl}
                            onChange={(file, preview) => handleImageChange(file, preview, true)}
                            label="Skill Image"
                            aspectRatio={1}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleUpdate(skill.id)}
                          className={cn(
                            "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70",
                            "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20 transition-all duration-300"
                          )}
                        >
                          <FiSave className="h-4 w-4" />
                          <span>Save</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditing(null)}
                          className={cn(
                            "rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10",
                            "hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
                          )}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        {skill.imageUrl && (
                          <div className="w-16 h-16">
                            <img
                              src={skill.imageUrl}
                              alt={`${skill.name} icon`}
                              className="w-full h-full object-cover rounded-lg border border-border"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground dark:text-foreground mb-3">{skill.name}</h4>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 bg-white/5 dark:bg-black/10 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="bg-primary/80 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground dark:text-muted-foreground text-sm font-medium w-12">{skill.level}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditing(skill.id);
                            setEditData({ name: skill.name, level: skill.level, imageUrl: skill.imageUrl || '' });
                          }}
                          className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                          className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-destructive/10 dark:hover:bg-destructive/20 backdrop-blur-sm transition-all duration-300"
                        >
                          <FiTrash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}