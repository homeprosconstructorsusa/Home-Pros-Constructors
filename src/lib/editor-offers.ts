import { editorDraft, type EditorCityOffer } from "./editor-drafts";
export type { EditorCityOffer } from "./editor-drafts";
export async function getEditorCityOffer(slug: string): Promise<EditorCityOffer | undefined> {
  if (!editorDraft(slug)) return undefined;
  if (process.env.CATALOG_MODE === "demo") return editorDraft(slug);
  const { getDb } = await import("./db");
  return (await getDb().editorCityOffer.findUnique({ where: { courseCode_citySlug: { courseCode: "video-editing", citySlug: slug } } })) ?? undefined;
}
