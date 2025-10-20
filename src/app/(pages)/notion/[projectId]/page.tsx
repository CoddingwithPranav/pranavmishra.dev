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
    return <section className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl  mt-32 text-center block font-semibold mb-6">Not Page </h1>
       
      </div>
    </section>;
  }

  const recordMap = await getNotionPage(pageId);

  if (!recordMap) {
    return  <section className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl  mt-32 text-center block font-semibold mb-6">Not Found</h1>
       
      </div>
    </section>
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
