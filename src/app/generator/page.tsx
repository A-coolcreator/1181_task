"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function GeneratorPage() {
  const [crushInfo, setCrushInfo] = useState("");
  const [style, setStyle] = useState("");
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleSubmit = () => {
    // Navigate to results page with form data
    router.push(`/results?crushInfo=${encodeURIComponent(crushInfo)}&style=${encodeURIComponent(style)}`);
  };

  return (
    <ProtectedRoute>
      <div className="relative w-full min-h-screen bg-white">
      {/* Background Image */}
      <Image
        src="https://api.builder.io/api/v1/image/assets/TEMP/75bb11bd35b4aef773d9c9279cd0f60616ff4673?width=2880"
        alt=""
        fill
        className="object-cover"
        style={{ opacity: 0.15 }}
        sizes="100vw"
      />

      {/* Header with Signout */}
      <div className="relative z-10 flex justify-between items-start p-8">
        <div className="flex-1" />
        <Button variant="secondary" size="md" onClick={handleSignOut}>
          Signout
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 -mt-16">
        {/* Title */}
        <h1 className="font-grand-hotel text-[#FF2157] text-4xl sm:text-5xl text-center mb-8 tracking-wide">
          Pickup line Generator
        </h1>

        {/* Form */}
        <div className="w-full max-w-lg space-y-8">
          {/* Crush Info Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-grand-hotel text-[#A5455C] text-xl tracking-wide">
                Tell us about your crush
              </label>
              <textarea
                value={crushInfo}
                onChange={(e) => setCrushInfo(e.target.value)}
                placeholder="She is a 10 but..&#10;He likes football...."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg bg-white font-grand-hotel text-lg placeholder:text-[#DCDCDC] focus:outline-none focus:border-[#FF2157] leading-6"
                style={{ resize: "none" }}
              />
            </div>
          </div>

          {/* Style Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-grand-hotel text-[#A5455C] text-xl tracking-wide">
                Style
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="eg: Funny"
                className="w-full p-4 border border-gray-200 rounded-lg bg-white font-grand-hotel text-lg placeholder:text-[#DCDCDC] focus:outline-none focus:border-[#FF2157]"
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleSubmit}
            disabled={!crushInfo.trim() || !style.trim()}
            size="lg"
            withHearts
            className="w-full"
          >
            Generate for me
          </Button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
