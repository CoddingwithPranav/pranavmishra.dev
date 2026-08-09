"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";

const NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false },
);

// Loaded lazily so prismjs / katex / the collection renderer stay out of the
// initial bundle. The matching CSS is imported in src/app/layout.tsx.
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false },
);

export default function NotionRendererClient({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-6 text-black">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{ Code, Collection, Equation, Modal }}
      />
    </div>
  );
}
