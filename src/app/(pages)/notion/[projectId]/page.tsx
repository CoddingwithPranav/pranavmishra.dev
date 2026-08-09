import { getProjectById } from "@/app/actions/project";
import { getNotionPage } from "@/lib/getNotionPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotionRendererClient from "./NotionRendererClient";

export const revalidate = 3600;

// Matches the page id at the end of a Notion URL, dashed or bare, ignoring any
// slug that precedes it and any ?query / #hash that follows.
const NOTION_PAGE_ID =
  /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})(?:[?#]|$)/i;

function Message({ title, hint }: { title: string; hint: string }) {
  return (
    <section className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl mt-32 font-semibold mb-4">{title}</h1>
        <p className="text-muted-foreground mb-4">{hint}</p>
        <Button asChild variant="link">
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    </section>
  );
}

export default async function NotionProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  const projectResult = await getProjectById(projectId);
  const foundProject = projectResult.data;

  if (!foundProject) {
    return (
      <Message
        title="Project Not Found"
        hint="No project exists with this id."
      />
    );
  }

  const match = (foundProject.notionLink || "").match(NOTION_PAGE_ID);
  const pageId = match ? match[1].replace(/-/g, "") : null;

  if (!pageId) {
    return (
      <Message
        title="No Notion Page Linked"
        hint="This project has no Notion link set, or the link is not a valid Notion URL."
      />
    );
  }

  const recordMap = await getNotionPage(pageId);

  if (!recordMap || Object.keys(recordMap.block ?? {}).length === 0) {
    return (
      <Message
        title="Could Not Load Notion Page"
        hint="The page could not be fetched. Make sure it is published to web in Notion (Share → Publish → Publish to web)."
      />
    );
  }

  return (
    <section className="px-4 relative sm:px-6 py-12">
      <div className=" relative z-10  w-full ">
        <h1 className="text-4xl  mt-32 text-center block font-semibold mb-6">{foundProject.name}</h1>
        <NotionRendererClient recordMap={recordMap} />
      </div>
    </section>
  );
}
