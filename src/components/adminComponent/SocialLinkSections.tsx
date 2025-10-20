import { getAboutMe } from "@/app/actions/aboutMe";
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from "@/app/actions/socialLinks";
import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiLink, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import ImageCropper from "../shared/imagecopper";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  aboutMeId: string;
}

export default function SocialLinksSection() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ platform: '', url: '', icon: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [aboutMeId, setAboutMeId] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutResult = await getAboutMe();
    if (aboutResult.success && aboutResult.data) {
      setAboutMeId(aboutResult.data.id);
      const linksResult = await getSocialLinks(aboutResult.data.id);
      if (linksResult.success) {
        setLinks((linksResult.data || []).map((link: any) => ({
          ...link,
          icon: link.icon === null ? undefined : link.icon,
        })));
      } else {
        toast.error("Failed to load social links. Please try again.");
      }
    } else {
      toast.error("Failed to load profile data. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ platform: '', url: '', icon: '' });
    setFormFile(null);
    setShowAdd(false);
    setEditing(null);
  };

  const handleImageChange = (file: File | null, preview: string) => {
    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("Image size exceeds 10MB limit.");
      return;
    }
    setFormFile(file);
    setFormData({ ...formData, icon: preview });
    if (file) {
      toast.success("Image selected successfully!");
    }
  };

  const handleAdd = async () => {
    if (!formData.platform || !formData.url || !aboutMeId) {
      toast.error("Platform and URL are required.");
      return;
    }

    try {
      let icon = formData.icon;

      // Upload image if a file is selected
      if (formFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", formFile);

        const uploadResponse = await fetch("/api/uploads", {
          method: "POST",
          body: formDataUpload,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }
        icon = uploadResult.url;
      }

      const result = await toast.promise(
        createSocialLink({ ...formData, icon ,aboutMeId }),
        {
          loading: "Adding social link...",
          success: "Social link added successfully!",
          error: "Failed to add social link. Please try again.",
        }
      );

      if (result.success) {
        resetForm();
        loadData();
      }
    } catch (error: any) {
      console.error('Add social link error:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.platform || !formData.url) {
      toast.error("Platform and URL are required.");
      return;
    }

    try {
      let icon = formData.icon;

      // Upload image if a file is selected
      if (formFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", formFile);

        const uploadResponse = await fetch("/api/uploads", {
          method: "POST",
          body: formDataUpload,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }
        icon = uploadResult.url;
      }

      const result = await toast.promise(
        updateSocialLink(id, { ...formData, icon }),
        {
          loading: "Updating social link...",
          success: "Social link updated successfully!",
          error: "Failed to update social link. Please try again.",
        }
      );

      if (result.success) {
        resetForm();
        loadData();
      }
    } catch (error: any) {
      console.error('Update social link error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      try {
        await toast.promise(
          deleteSocialLink(id),
          {
            loading: "Deleting social link...",
            success: "Social link deleted successfully!",
            error: "Failed to delete social link. Please try again.",
          }
        );
        loadData();
      } catch (error: any) {
        console.error('Delete social link error:', error);
      }
    }
  };

  const startEdit = (link: SocialLink) => {
    setEditing(link.id);
    setFormData({ platform: link.platform, url: link.url, icon: link.icon || '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-8">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
              <div>
                <ImageCropper
                  value={formData.icon}
                  onChange={handleImageChange}
                  label="Platform Image"
                  aspectRatio={1}
                  className="mt-2"
                />
              </div>
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
                      {link.icon ? (
                        <div className="w-10 h-10">
                          <img
                            src={link.icon}
                            alt={`${link.platform} logo`}
                            className="w-full h-full object-cover rounded-lg border border-border"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center shadow-sm">
                          <FiLink className="text-primary h-5 w-5" />
                        </div>
                      )}
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