import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const landscapeImages = [
  "https://pixabay.com/vectors/ai-generated-planet-landscape-alien-9159928/",
  "https://img.freepik.com/free-photo/view-rock-formations-with-nature-landscape_23-2151723160.jpg",
  "https://iunewind.ru/wp-content/uploads/2024/04/scifi-vivid-retropak-01-City-UHD.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/035/480/355/small_2x/ai-generated-beautiful-young-multiethnic-women-with-natural-makeup-advertising-for-female-fashion-models-face-and-body-skin-care-photo.jpg",
];

const portraitImages = [
  "https://freeflux.ai/images/a42b0ebf-2dda-4db3-b45b-770f1035f1c9.jpg",
  "https://freeflux.ai/images/d4b1a518-7517-42b5-983b-6658d1e98c1b.jpg",
  "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847-1024x682.jpeg",
  "https://assets.grok.com/users/e94bb7b9-f5a7-4355-b4aa-6825d16b551f/generated/3qHIMnr7sjaGi9fz/image.jpg",

];

export default function Feature() {
  const [landscapeIndex1, setLandscapeIndex1] = useState(0);
  const [landscapeIndex2, setLandscapeIndex2] = useState(1);
  const [portraitIndex1, setPortraitIndex1] = useState(0);
  const [portraitIndex2, setPortraitIndex2] = useState(1);

  useEffect(() => {
    const landscapeInterval = setInterval(() => {
      setLandscapeIndex1((prev) => (prev + 1) % landscapeImages.length);
      setLandscapeIndex2((prev) => (prev + 1) % landscapeImages.length);
    }, 3000);

    const portraitInterval = setInterval(() => {
      setPortraitIndex1((prev) => (prev + 1) % portraitImages.length);
      setPortraitIndex2((prev) => (prev + 1) % portraitImages.length);
    }, 3000);

    return () => {
      clearInterval(landscapeInterval);
      clearInterval(portraitInterval);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/20 backdrop-blur-sm rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={landscapeImages[landscapeIndex1]}
                  alt="Landscape Image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-sm tracking-tight">AI Portrait Generation</h3>
                <p className="text-muted-foreground/80 text-xs max-w-xs">
                  Create stunning AI-generated portraits with advanced neural networks
                </p>
              </div>
            </div>
            <div className="bg-muted/20 backdrop-blur-sm rounded-md aspect-square p-6 flex justify-between flex-col relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={portraitImages[portraitIndex1]}
                  alt="Portrait Image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-sm tracking-tight">Landscape Creation</h3>
                <p className="text-muted-foreground/80 text-xs max-w-xs">
                  Generate breathtaking landscapes with AI-powered scene creation
                </p>
              </div>
            </div>

            <div className="bg-muted/20 backdrop-blur-sm rounded-md aspect-square p-6 flex justify-between flex-col relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={portraitImages[portraitIndex2]}
                  alt="Portrait Image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-sm tracking-tight">Art Style Transfer</h3>
                <p className="text-muted-foreground/80 text-xs max-w-xs">
                  Transform your images with various artistic styles and effects
                </p>
              </div>
            </div>
            <div className="bg-muted/20 backdrop-blur-sm rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={landscapeImages[landscapeIndex2]}
                  alt="Landscape Image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-sm tracking-tight">Concept Art Generation</h3>
                <p className="text-muted-foreground/80 text-xs max-w-xs">
                  Bring your creative concepts to life with AI-powered visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
