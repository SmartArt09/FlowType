
'use client';

import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AdBanner() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [pathname]);

  return (
    <div key={pathname}>
        <Card className="w-full h-full min-h-[120px] flex items-center justify-center bg-card/50">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-6541853864426252"
                data-ad-slot="7454735957"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </Card>
    </div>
  );
}
