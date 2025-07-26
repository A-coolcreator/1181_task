"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
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

function ResultsContent() {
  const searchParams = useSearchParams();
  const [pickupLines, setPickupLines] = useState<PickupLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { signOut } = useAuth();

  const crushInfo = searchParams.get("crushInfo") || "";
  const style = searchParams.get("style") || "";

  const handleSignOut = useCallback(async () => {
    await signOut();
    // The AuthContext will handle the redirect to home page
  }, [signOut]);

  const copyToClipboard = useCallback(async (content: string, id: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  }, []);

  const regenerateLines = useCallback(() => {
    setIsLoading(true);
    // Simulate regeneration with different content
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [crushInfo, style]);

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

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Background Image */}
      <Image
        src="https://api.builder.io/api/v1/image/assets/TEMP/75bb11bd35b4aef773d9c9279cd0f60616ff4673?width=2880"
        alt="Background decoration"
        fill
        className="object-cover"
        style={{ opacity: 0.15 }}
        sizes="100vw"
        priority
      />

      {/* Header with Signout */}
      <header className="relative z-10 flex justify-between items-start p-8">
        <div className="flex-1" />
        <Button variant="secondary" size="md" onClick={handleSignOut}>
          Sign out
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center px-4 -mt-16">
        {/* Title */}
        <h1 className="font-grand-hotel text-[#FF2157] text-4xl sm:text-5xl text-center mb-8 tracking-wide">
          Pickup Line Generator
        </h1>

        {/* Content Container */}
        <div className="w-full max-w-lg space-y-4">
          {/* Instructions */}
          <p className="font-grand-hotel text-[#A5455C] text-center text-xl mb-6">
            Copy the below pick up lines
          </p>

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-4" role="status" aria-label="Loading pickup lines">
              <div className="animate-pulse bg-gray-200 h-32 rounded border border-[#FF2157]" />
              <div className="animate-pulse bg-gray-200 h-32 rounded border border-[#FF2157]" />
            </div>
          ) : (
            /* Pickup Lines */
            <div className="space-y-4">
              {pickupLines.map((line) => (
                <article
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
                    aria-label={`Copy ${line.title}`}
                    type="button"
                  >
                    <CopyIcon className="w-5 h-5" />
                    {copiedId === line.id && (
                      <span className="absolute -top-8 -right-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </article>
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
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF2157]"></div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <ResultsContent />
      </Suspense>
    </ProtectedRoute>
  );
}
