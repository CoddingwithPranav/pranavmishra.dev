"use server";

import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN,
});

// notion-client 7.6.0 returns each record double-wrapped as
// `{ value: { value: <record>, role } }` instead of the flat
// `{ role, value: <record> }` shape that react-notion-x expects.
// Unwrap the extra layer so the renderer can read `block.value.id`.
function normalizeRecordMap(recordMap: ExtendedRecordMap): ExtendedRecordMap {
  const maps = [
    "block",
    "collection",
    "collection_view",
    "notion_user",
  ] as const;

  for (const mapName of maps) {
    const map = recordMap[mapName] as Record<string, any> | undefined;
    if (!map) continue;
    for (const id of Object.keys(map)) {
      const rec = map[id];
      if (rec?.value && rec.value.value) {
        map[id] = { role: rec.value.role ?? rec.role, value: rec.value.value };
      }
    }
  }

  return recordMap;
}

export async function getNotionPage(pageId: string) {
  try {
    const recordMap = await notion.getPage(pageId);
    return normalizeRecordMap(recordMap);
  } catch (error) {
    console.error("getNotionPage: Error fetching Notion page", error);
    return null;
  }
}
