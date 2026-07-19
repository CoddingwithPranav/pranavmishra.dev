"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";

const NotionRenderer = dynamic(() => import("react-notion-x").then((m) => m.NotionRenderer), {
  ssr: false,
});

export default function NotionRendererClient({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-6 text-black">
      <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
    </div>
  );
}
