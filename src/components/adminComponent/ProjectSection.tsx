import { getProjects, getTags, createProject, updateProject, deleteProject } from "@/app/actions/actions";
import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiGithub, FiGlobe, FiFileText, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    thubnail: '',
    notionLink: '',
    githubLink: '',
    liveLink: '',
    tagId: '',
    featured: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [projectsResult, tagsResult] = await Promise.all([
      getProjects(),
      getTags()
    ]);
    if (projectsResult.success) setProjects(projectsResult.data || []);
    if (tagsResult.success) setTags(tagsResult.data || []);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      thubnail: '',
      notionLink: '',
      githubLink: '',
      liveLink: '',
      tagId: '',
      featured: false,
    });
    setShowAdd(false);
    setEditing(null);
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.tagId) return;
    const result = await createProject(formData);
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleUpdate = async (id: string) => {
    const result = await updateProject(id, formData);
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      loadData();
    }
  };

  const startEdit = (project: any) => {
    setEditing(project.id);
    setFormData({
      name: project.name,
      description: project.description || '',
      thubnail: project.thubnail || '',
      notionLink: project.notionLink || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      tagId: project.tagId,
      featured: project.featured,
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
            <span>Add Project</span>
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAdd || editing) && (
        <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
              {editing ? 'Edit Project' : 'Add New Project'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="name" className="text-foreground dark:text-foreground">Project Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="My Awesome Project"
                />
              </div>
              <div>
                <Label htmlFor="tagId" className="text-foreground dark:text-foreground">Tag/Category *</Label>
                <Select
                  value={formData.tagId}
                  onValueChange={(value) => setFormData({ ...formData, tagId: value })}
                >
                  <SelectTrigger className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50">
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border-white/10 dark:border-black/10 rounded-xl">
                    {tags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id} className="text-foreground dark:text-foreground hover:bg-primary/20 dark:hover:bg-primary/30">
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="thubnail" className="text-foreground dark:text-foreground">Thumbnail URL</Label>
                <Input
                  id="thubnail"
                  type="text"
                  value={formData.thubnail}
                  onChange={(e) => setFormData({ ...formData, thubnail: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="githubLink" className="text-foreground dark:text-foreground">GitHub Link</Label>
                <Input
                  id="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <Label htmlFor="liveLink" className="text-foreground dark:text-foreground">Live Link</Label>
                <Input
                  id="liveLink"
                  type="url"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="https://project.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notionLink" className="text-foreground dark:text-foreground">Notion Link</Label>
                <Input
                  id="notionLink"
                  type="url"
                  value={formData.notionLink}
                  onChange={(e) => setFormData({ ...formData, notionLink: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="https://notion.so/..."
                />
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
                placeholder="Project description..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked === true })}
                className="border-white/20 dark:border-black/20 text-primary focus:ring-primary/50 rounded"
              />
              <Label htmlFor="featured" className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer">
                Featured Project
              </Label>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => editing ? handleUpdate(editing) : handleAdd()}
                disabled={!formData.name || !formData.tagId}
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

      {/* Projects List */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
            Projects ({projects.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground dark:text-muted-foreground col-span-full">No projects added yet.</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group shadow-lg shadow-black/5 dark:shadow-white/5"
                >
                  {project.thubnail && (
                    <div className="featured-img aspect-video bg-muted overflow-hidden">
                      <img
                        src={project.thubnail}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground dark:text-foreground line-clamp-1">{project.name}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full shadow-sm">Featured</span>
                      )}
                    </div>
                    {project.description && (
                      <div
                        className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-primary/20 dark:bg-primary/30 text-primary text-xs rounded shadow-sm">
                        {project.tags?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-foreground hover:bg-white/10 dark:hover:bg-black/20 rounded-lg backdrop-blur-sm transition-all duration-300"
                          >
                            <FiGithub className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-foreground hover:bg-white/10 dark:hover:bg-black/20 rounded-lg backdrop-blur-sm transition-all duration-300"
                          >
                            <FiGlobe className="h-4 w-4" />
                          </a>
                        )}
                        {project.notionLink && (
                          <a
                            href={project.notionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-foreground hover:bg-white/10 dark:hover:bg-black/20 rounded-lg backdrop-blur-sm transition-all duration-300"
                          >
                            <FiFileText className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(project)}
                          className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
                          className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-destructive/10 dark:hover:bg-destructive/20 backdrop-blur-sm transition-all duration-300"
                        >
                          <FiTrash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}