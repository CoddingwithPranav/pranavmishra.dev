"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";

const NotionRenderer = dynamic(() => import("react-notion-x").then((m) => m.NotionRenderer), {
  ssr: false,
});

export default function NotionRendererClient({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 dark:bg-black/10">
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} />
    </div>
  );
}
