"use server";

import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

// No authToken on purpose. `notion-client` talks to Notion's private
// `www.notion.so/api/v3` endpoint, whose authToken must be the browser
// `token_v2` cookie -- an official `ntn_`/`secret_` integration key is
// rejected with 403. Pages are read unauthenticated instead, which works
// for any page that has been "Published to web" in Notion.
//
// The User-Agent is not optional: Notion 403s `api/v3` requests that don't
// look like they came from a browser, so ofetch's default UA fails on every
// page including public ones. Verified against the public react-notion-x
// test page -- identical request, 403 without this header, 200 with it.
const notion = new NotionAPI({
  ofetchOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
  },
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
    console.error(`getNotionPage: failed to fetch Notion page ${pageId}`, error);
    if (String(error).includes("403")) {
      console.error(
        `getNotionPage: 403 from Notion for ${pageId} -- the page is most likely not published to web. Open it in Notion and use Share > Publish > Publish to web.`,
      );
    }
    return null;
  }
}
