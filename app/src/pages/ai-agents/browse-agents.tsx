import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/ai-agent-data";

export default function BrowseAgents() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full py-10 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          Explore Our Agents  Ready To Assist
        </h2>
        {categories.map((category, index) => (
          <div key={`${category.title}-${index}`} className="mt-12">
            <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, idx) => (
                <Link key={`${item.title}-${idx}`} href="#">
                  <div className="flex gap-6 hover:ring rounded-lg p-2 -mx-2 sm:mx-0 max-w-lg">
                    <div className="h-24 aspect-square shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.image ? item.title : "Agent Image"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <span className="font-semibold tracking-tight text-lg">
                        {item.title}
                      </span>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}