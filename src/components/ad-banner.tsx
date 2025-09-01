
'use client';

import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AdBanner() {
  const pathname = usePathname();
  const adPushed = useRef(false);

  useEffect(() => {
    // Only push the ad if it hasn't been pushed for this instance.
    if (!adPushed.current) {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true; // Mark ad as pushed for this instance.
        } catch (err) {
            console.error("AdSense Error:", err);
        }
    }
  }, [pathname]);

  return (
    <div key={pathname}>
        <Card className="w-full h-full min-h-[120px] flex items-center justify-center bg-card/50">
            <ins className="adsbygoogle w-full"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-6541853864426252"
                data-ad-slot="7454735957"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </Card>
    </div>
  );
}
