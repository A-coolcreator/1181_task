"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button, CopyIcon } from "@/components";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface PickupLine {
  id: number;
  title: string;
  content: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [pickupLines, setPickupLines] = useState<PickupLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { signOut } = useAuth();

  const crushInfo = searchParams.get("crushInfo") || "";
  const style = searchParams.get("style") || "";

  const handleSignOut = async () => {
    await signOut();
    // The AuthContext will handle the redirect to home page
  };

  // Generate pickup lines based on the input
  useEffect(() => {
    if (!crushInfo && !style) {
      setIsLoading(false);
      return;
    }

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const generatedLines: PickupLine[] = [
        {
          id: 1,
          title: "Pickup line 1",
          content: `Are you into ${style} people? Because I'd love to tell you a ${style} story about how ${crushInfo}...`
        },
        {
          id: 2,
          title: "Pickup line 2",
          content: `If ${crushInfo}, then you must be perfect because you've got everything I'm looking for in a person...`
        }
      ];
      setPickupLines(generatedLines);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [crushInfo, style]);

  const copyToClipboard = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const regenerateLines = () => {
    setIsLoading(true);
    // Simulate regeneration with different content
    setTimeout(() => {
      const alternativeLines = [
        [
          `Is your name Google? Because you have everything I've been searching for, especially someone who ${crushInfo}...`,
          `Are you a time traveler? Because I see you in my future, and it looks ${style} and amazing...`
        ],
        [
          `Do you have a map? I keep getting lost in your eyes, just like how ${crushInfo}...`,
          `If you were a ${style} movie, you'd be a blockbuster hit in my heart...`
        ],
        [
          `Are you Wi-Fi? Because I'm feeling a connection, especially when you mentioned ${crushInfo}...`,
          `You must be a ${style} joke, because you've got me laughing and falling for you at the same time...`
        ]
      ];

      const randomSet = alternativeLines[Math.floor(Math.random() * alternativeLines.length)];
      const newLines: PickupLine[] = [
        {
          id: Date.now(),
          title: "Pickup line 1",
          content: randomSet[0]
        },
        {
          id: Date.now() + 1,
          title: "Pickup line 2",
          content: randomSet[1]
        }
      ];
      setPickupLines(newLines);
      setIsLoading(false);
    }, 1500);
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

        {/* Content Container */}
        <div className="w-full max-w-lg space-y-4">
          {/* Instructions */}
          <p className="font-grand-hotel text-[#A5455C] text-center text-xl mb-6">
            Copy the below pick up lines
          </p>

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-200 h-32 rounded border border-[#FF2157]"></div>
              <div className="animate-pulse bg-gray-200 h-32 rounded border border-[#FF2157]"></div>
            </div>
          ) : (
            /* Pickup Lines */
            <div className="space-y-4">
              {pickupLines.map((line) => (
                <div
                  key={line.id}
                  className="relative p-6 border border-[#FF2157] rounded bg-white"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-grand-hotel text-[#B5002C] text-xl">
                        {line.title}
                      </h3>
                      <p className="font-grand-hotel text-[#FF6A8E] text-lg leading-relaxed">
                        {line.content}
                      </p>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(line.content, line.id)}
                    className="absolute top-6 right-6 p-1 hover:bg-gray-100 rounded transition-colors group relative"
                  >
                    <CopyIcon className="w-5 h-5" />
                    {copiedId === line.id && (
                      <span className="absolute -top-8 -right-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Regenerate Button */}
          <div className="pt-8">
            <Button
              onClick={regenerateLines}
              disabled={isLoading}
              loading={isLoading}
              size="lg"
              withHearts
              className="w-full"
            >
              Regenerate pickup line
            </Button>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
