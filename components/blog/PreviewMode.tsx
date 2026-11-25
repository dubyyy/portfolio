import { draftMode } from "next/headers";
import { PreviewRefresh } from "./PreviewRefresh";

/** Only renders while Draft Mode is on, i.e. inside the Studio's Presentation preview. */
export async function PreviewMode() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return <PreviewRefresh />;
}
