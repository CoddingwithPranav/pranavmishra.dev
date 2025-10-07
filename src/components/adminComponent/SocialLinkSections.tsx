import { getAboutMe } from "@/app/actions/aboutMe";
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from "@/app/actions/socialLinks";
import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiLink, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SocialLinksSection() {
  const [links, setLinks] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ platform: '', url: '', icon: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [aboutMeId, setAboutMeId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutResult = await getAboutMe();
    if (aboutResult.success && aboutResult.data) {
      setAboutMeId(aboutResult.data.id);
      const linksResult = await getSocialLinks(aboutResult.data.id);
      if (linksResult.success) {
        setLinks(linksResult.data || []);
      }
    }
  };

  const resetForm = () => {
    setFormData({ platform: '', url: '', icon: '' });
    setShowAdd(false);
    setEditing(null);
  };

  const handleAdd = async () => {
    if (!formData.platform || !formData.url || !aboutMeId) return;
    const result = await createSocialLink({ ...formData, aboutMeId });
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleUpdate = async (id: string) => {
    const result = await updateSocialLink(id, formData);
    if (result.success) {
      resetForm();
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      await deleteSocialLink(id);
      loadData();
    }
  };

  const startEdit = (link: any) => {
    setEditing(link.id);
    setFormData({ platform: link.platform, url: link.url, icon: link.icon || '' });
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
            <span>Add Social Link</span>
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAdd || editing) && (
        <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
              {editing ? 'Edit Social Link' : 'Add New Social Link'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="platform" className="text-foreground dark:text-foreground">Platform *</Label>
                <Input
                  id="platform"
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="GitHub, LinkedIn, Twitter"
                />
              </div>
              <div>
                <Label htmlFor="icon" className="text-foreground dark:text-foreground">Icon Name (React Icons)</Label>
                <Input
                  id="icon"
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="FiGithub, FiLinkedin"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="url" className="text-foreground dark:text-foreground">URL *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => editing ? handleUpdate(editing) : handleAdd()}
                disabled={!formData.platform || !formData.url}
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

      {/* Social Links List */}
      <Card className="bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-2xl sm:text-3xl">
            Social Links ({links.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {links.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground dark:text-muted-foreground col-span-2">No social links added yet.</p>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center shadow-sm">
                        <FiLink className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground dark:text-foreground">{link.platform}</h4>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {link.url}
                        </a>
                        {link.icon && (
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Icon: {link.icon}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(link)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(link.id)}
                        className="rounded-lg bg-white/5 dark:bg-black/10 hover:bg-destructive/10 dark:hover:bg-destructive/20 backdrop-blur-sm transition-all duration-300"
                      >
                        <FiTrash2 className="h-4 w-4 text-destructive" />
                      </Button>
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