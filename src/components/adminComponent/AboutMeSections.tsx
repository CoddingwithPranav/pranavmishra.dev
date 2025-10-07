import { getAboutMe, updateAboutMe, createAboutMe } from "@/app/actions/aboutMe";
import { useState, useEffect } from "react";
import { FiX, FiEdit2, FiSave } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function AboutMeSection() {
  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePic: '',
    content: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getAboutMe();
    if (result.success && result.data) {
      setData({
        id: result.data.id ?? '',
        name: result.data.name ?? '',
        email: result.data.email ?? '',
        phone: result.data.phone ?? '',
        address: result.data.address ?? '',
        profilePic: result.data.profilePic ?? '',
        content: result.data.content ?? '',
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const result = data.id 
      ? await updateAboutMe(data.id, data)
      : await createAboutMe(data);
    
    if (result.success) {
      setEditing(false);
      loadData();
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-black/20 text-card-foreground shadow-xl shadow-black/5 dark:shadow-white/5 rounded-3xl animate-in fade-in duration-500 dark:text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 pb-4">
        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">About Me</CardTitle>
        <Button
          variant={editing ? "outline" : "default"}
          onClick={() => setEditing(!editing)}
          className={cn(
            "flex items-center gap-2 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm rounded-xl border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/10 hover:bg-white/10 dark:hover:bg-black/20 shadow-lg shadow-black/5 dark:shadow-white/5",
            editing ? "border-destructive/50 text-destructive hover:bg-destructive/5 dark:hover:bg-destructive/10" : "bg-primary/80 hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70"
          )}
        >
          {editing ? (
            <>
              <FiX className="h-4 w-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FiEdit2 className="h-4 w-4" />
              <span>Edit</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium dark:text-foreground">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    disabled={!editing}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium dark:text-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    disabled={!editing}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground font-medium dark:text-foreground">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    disabled={!editing}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-foreground font-medium dark:text-foreground">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    disabled={!editing}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                    placeholder="City, Country"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="profilePic" className="text-foreground font-medium dark:text-foreground">Profile Picture URL</Label>
                  <Input
                    id="profilePic"
                    type="text"
                    value={data.profilePic}
                    onChange={(e) => setData({ ...data, profilePic: e.target.value })}
                    disabled={!editing}
                    className="mt-2 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content" className="text-foreground font-medium dark:text-foreground">About Content (HTML supported)</Label>
                <Textarea
                  id="content"
                  value={data.content}
                  onChange={(e) => setData({ ...data, content: e.target.value })}
                  disabled={!editing}
                  rows={6}
                  className="mt-2 font-mono text-sm bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl dark:text-foreground dark:focus:ring-primary/50 dark:focus:border-primary/50"
                  placeholder="Write about yourself... HTML tags are supported"
                />
                <p className="text-xs text-muted-foreground mt-2 dark:text-muted-foreground">Supports HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, etc.</p>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center sm:justify-end">
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48">
                <Avatar className="w-full h-full rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-black/20 shadow-lg shadow-black/10 dark:shadow-white/10">
                  <AvatarImage src={data.profilePic || "/placeholder.jpg"} alt="Profile picture" />
                  <AvatarFallback className="bg-primary/20 text-primary text-lg sm:text-xl md:text-2xl dark:bg-primary/30">{data.name.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          {editing && (
            <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 dark:border-black/10">
              <Button
                variant="outline"
                onClick={() => setEditing(false)}
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
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </Button>
            </div>
          )}
          <hr className="fade_rule" />
          {!editing && data.content && (
            <div className="bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-black/10 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-white/5">
              <div
                className="prose prose-sm max-w-none text-foreground dark:text-foreground"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}