import { getProjects } from "@/app/actions/project";
import { getNotionPage } from "@/lib/getNotionPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotionRendererClient from "./NotionRendererClient";

export default async function NotionProjectPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  const projectsResult = await getProjects();
  const foundProject = projectsResult.data?.find((p) => p.id === projectId);

  if (!foundProject) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-semibold mb-4">Project Not Found</h1>
        <Button asChild variant="link">
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </section>
    );
  }

  const notionLink = foundProject.notionLink || "";
  const match = notionLink.match(/[0-9a-f]{32}/i) || notionLink.match(/[0-9a-f-]{36}/i);
  const pageId = match ? match[0].replace(/-/g, "") : null;

  if (!pageId) {
    return <div>No Notion page linked</div>;
  }

  const recordMap = await getNotionPage(pageId);

  if (!recordMap) {
    return <div>Failed to load Notion content.</div>;
  }

  return (
    <section className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6">{foundProject.name}</h1>
        <NotionRendererClient recordMap={recordMap} />
      </div>
    </section>
  );
}
