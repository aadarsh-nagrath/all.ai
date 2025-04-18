import { redirect } from "next/navigation";

export default function Docs() {
  redirect("process.env.DOCS_URL");
}
