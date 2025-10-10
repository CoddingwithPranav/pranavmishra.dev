"use server";

import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN,
});

export async function getNotionPage(pageId: string) {
  try {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error("getNotionPage: Error fetching Notion page", error);
    return null;
  }
}
