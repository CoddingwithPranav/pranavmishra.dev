import { getAboutMe } from "@/app/actions/aboutMe";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/app/actions/experiences";
import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiEdit2, FiTrash2, FiMapPin, FiCalendar } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [aboutMeId, setAboutMeId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutResult = await getAboutMe();
    if (aboutResult.success && aboutResult.data) {
      setAboutMeId(aboutResult.data.id);
      const expResult = await getExperiences(aboutResult.data.id);
      if (expResult.success) {
        setExperiences(expResult.data || []);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setShowAdd(false);
    setEditing(null);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.company || !aboutMeId) return;
    const result = await createExperience({
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
    const result = await updateExperience(id, {
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
    if (confirm('Are you sure you want to delete this experience?')) {
      await deleteExperience(id);
      loadData();
    }
  };

  const startEdit = (exp: any) => {
    setEditing(exp.id);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: new Date(exp.startDate).toISOString().split('T')[0],
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      description: exp.description || '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Button */}
      {!showAdd && !editing && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowAdd(true)}
            className={cn(
              "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70",
              "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20 transition-all duration-300"
            )}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Experience</span>
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAdd || editing) && (
        <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
              {editing ? 'Edit Experience' : 'Add New Experience'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="title" className="text-foreground dark:text-foreground">Job Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="Senior Developer"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-foreground dark:text-foreground">Company *</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="Tech Corp"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-foreground dark:text-foreground">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-foreground dark:text-foreground">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-foreground dark:text-foreground">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-foreground dark:text-foreground">Description (HTML supported)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="mt-2 font-mono text-sm bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                placeholder="Describe your role and achievements..."
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => editing ? handleUpdate(editing) : handleAdd()}
                disabled={!formData.title || !formData.company || !formData.startDate}
                className={cn(
                  "flex items-center gap-2 rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70",
                  "backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/20 transition-all duration-300"
                )}
              >
                <FiSave className="h-4 w-4" />
                <span>{editing ? 'Update' : 'Add'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className={cn(
                  "rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10",
                  "hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
                )}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience List */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
            Work Experience ({experiences.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {experiences.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground dark:text-muted-foreground">No experiences added yet.</p>
          ) : (
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative border-l-4 border-primary pl-6">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary border-4 border-white/10 dark:border-black/10" />
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(exp)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(exp.id)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-destructive/10 dark:hover:bg-destructive/20 backdrop-blur-sm transition-all duration-300"
                      >
                        <FiTrash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3 dark:text-muted-foreground">
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3.5 w-3.5" />
                        <span>{exp.location}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiCalendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </span>
                    </span>
                  </div>
                  {exp.description && (
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground dark:text-muted-foreground bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-xl p-4"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
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