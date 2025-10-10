"use client";


import { useState, useEffect } from 'react';
import { FiX, FiEdit2, FiSave, FiTrash2, FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { getAboutMe } from '@/app/actions/aboutMe';
import { createRetrospective, deleteRetrospective, getRetrospectives, updateRetrospective } from '@/app/actions/retrospective';

type Retrospective = {
  id: string;
  year: string;
  title: string;
  description: string;
  views: number;
  aboutMeId: string;
};

export default function RetrospectivesSection() {
  const [retrospectives, setRetrospectives] = useState<Retrospective[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    year: '',
    title: '',
    description: '',
    views: 0,
    aboutMeId: '',
  });
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const aboutMeResult = await getAboutMe();
    if (aboutMeResult.success && aboutMeResult.data) {
      const aboutMeId = aboutMeResult.data.id;
      setFormData((prev) => ({ ...prev, aboutMeId }));
      const result = await getRetrospectives(aboutMeId);
      if (result.success && result.data) {
        setRetrospectives(result.data);
      } else {
        toast.error(result.error || 'Failed to load retrospectives');
      }
    } else {
      toast.error('Failed to load About Me data');
    }
  };

  const handleSave = async () => {
    if (!formData.year || !formData.title || !formData.description) {
      toast.error('Year, title, and description are required.');
      return;
    }

    setLoading(true);
    try {
      const saveData = {
        year: formData.year,
        title: formData.title,
        description: formData.description,
        views: formData.views,
        aboutMeId: formData.aboutMeId,
      };

      const savePromise = formData.id
        ? updateRetrospective(formData.id, saveData)
        : createRetrospective(saveData);

      await toast.promise(savePromise, {
        loading: 'Saving retrospective...',
        success: 'Retrospective saved successfully!',
        error: 'Failed to save retrospective. Please try again.',
      });

      const result = await savePromise;
      if (result.success) {
        setEditing(false);
        setCreating(false);
        setFormData({
          id: '',
          year: '',
          title: '',
          description: '',
          views: 0,
          aboutMeId: formData.aboutMeId,
        });
        await loadData();
      }
    } catch (error: any) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (retrospective: Retrospective) => {
    setFormData(retrospective);
    setEditing(true);
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await toast.promise(deleteRetrospective(id), {
        loading: 'Deleting retrospective...',
        success: 'Retrospective deleted successfully!',
        error: 'Failed to delete retrospective. Please try again.',
      });
      await loadData();
    } catch (error: any) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setCreating(false);
    setFormData({
      id: '',
      year: '',
      title: '',
      description: '',
      views: 0,
      aboutMeId: formData.aboutMeId,
    });
  };

  const handleCreate = () => {
    setCreating(true);
    setEditing(false);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-black/20 text-card-foreground shadow-xl shadow-black/5 dark:shadow-white/5 rounded-3xl animate-in fade-in duration-500 dark:text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 pb-4">
        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Retrospectives
        </CardTitle>
        {!creating && !editing && (
          <Button
            onClick={handleCreate}
            className="flex items-center gap-2 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70 shadow-lg shadow-primary/10 dark:shadow-primary/20"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Retrospective</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-6 sm:space-y-8">
        {(creating || editing) && (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label
                  htmlFor="year"
                  className="text-foreground font-medium dark:text-foreground"
                >
                  Year *
                </Label>
                <Input
                  id="year"
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="2025"
                />
              </div>
              <div>
                <Label
                  htmlFor="title"
                  className="text-foreground font-medium dark:text-foreground"
                >
                  Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="Yearly Reflection"
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="description"
                  className="text-foreground font-medium dark:text-foreground"
                >
                  Description (HTML supported) *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={6}
                  className="mt-2 font-mono text-sm bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="Reflect on the year... HTML tags are supported"
                />
                <p className="text-xs text-muted-foreground mt-2 dark:text-muted-foreground">
                  Supports HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;,
                  &lt;a&gt;, etc.
                </p>
              </div>
              <div>
                <Label
                  htmlFor="views"
                  className="text-foreground font-medium dark:text-foreground"
                >
                  Views
                </Label>
                <Input
                  id="views"
                  type="number"
                  value={formData.views}
                  onChange={(e) =>
                    setFormData({ ...formData, views: parseInt(e.target.value) || 0 })
                  }
                  className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 dark:border-black/10">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="transition-all duration-300 backdrop-blur-sm rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 shadow-lg shadow-black/5 dark:shadow-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 transition-all duration-300 backdrop-blur-sm rounded-xl bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70 shadow-lg shadow-primary/10 dark:shadow-primary/20"
              >
                <FiSave className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Retrospective'}</span>
              </Button>
            </div>
          </div>
        )}
        <hr className="fade_rule" />
        <div className="space-y-4">
          {retrospectives.map((retrospective) => (
            <div
              key={retrospective.id}
              className="bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-white/5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                    {retrospective.title} ({retrospective.year})
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 dark:text-muted-foreground">
                    Views: {retrospective.views}
                  </p>
                  <div
                    className="prose prose-sm max-w-none text-foreground dark:text-foreground mt-2"
                    dangerouslySetInnerHTML={{ __html: retrospective.description }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(retrospective)}
                    className="transition-all duration-300 backdrop-blur-sm rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(retrospective.id)}
                    className="transition-all duration-300 backdrop-blur-sm rounded-xl border-destructive/50 text-destructive hover:bg-destructive/5 dark:hover:bg-destructive/10"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {retrospectives.length === 0 && (
            <p className="text-center text-muted-foreground dark:text-muted-foreground">
              No retrospectives found. Add one to get started!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}