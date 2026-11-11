import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-secret");

    if (
      process.env.SANITY_REVALIDATE_SECRET &&
      secret !== process.env.SANITY_REVALIDATE_SECRET
    ) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const slug = body?.slug?.current;

    revalidatePath("/blog");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Revalidation failed" }, { status: 500 });
  }
}

