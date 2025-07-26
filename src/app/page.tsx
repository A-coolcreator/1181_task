import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://api.builder.io/api/v1/image/assets/TEMP/75bb11bd35b4aef773d9c9279cd0f60616ff4673?width=2880"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Title - positioned to match Figma (top: 87px, left: 611px from 1440px width) */}
        <div className="pt-[87px]">
          <h1 className="font-grand-hotel text-white text-5xl text-center leading-normal w-[185px] h-[130px] flex items-center justify-center">
            Pickup line Generator
          </h1>
        </div>

        {/* CTA Button - positioned to match Figma (top: 429px, left: 562px) */}
        <div className="absolute top-[429px] left-1/2 transform -translate-x-1/2">
          <Link href="/login">
            <Button size="lg" withHearts className="shadow-lg text-3xl w-[291px] h-[63px]">
              Generate one for me
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
