"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Headline from "./headline";
import SearchInput from "./searchbox";
import Subheadline from "./subheadline";
import { ThemeBadge } from "@/components/theme-badge"


export default function Workplace() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Theme
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <ThemeBadge />
                </BreadcrumbItem>
              </BreadcrumbList>
              
            </Breadcrumb>
        <Headline />
        <Subheadline />
        <SearchInput />
    </div>
  );
}


// what are things in the chat ui -
// what can i help you with headline
// message input - web search , reason, voice typing
// miscellaneous task performing button templates


// gemini {hello name of person}
// no need to di1play model version as it is not much required; can be exception
// upload image feature

// perplexity better chat box and [auto button to change model close to chat]
// try pro modal pop up in corner of screen
