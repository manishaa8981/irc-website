"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTrademarksPublicApi } from "../../axios/api";

export default function TrademarkCarousel() {
  const [trademarks, setTrademarks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrademarks = async () => {
      try {
        const res = await getTrademarksPublicApi();
        if (res?.data?.success) {
          setTrademarks(res.data.result || []);
        }
      } catch (err) {
        console.error("Failed to fetch trademarks", err);
      }
    };
    fetchTrademarks();
  }, []);

  if (!trademarks || trademarks.length === 0) return null;

  // duplicate array for seamless loop
  const scrollingTrademarks = [...trademarks, ...trademarks];

  const handleLogoClick = (trademark) => {
    // navigate to details page – adjust route if you prefer slugs
    router.push(`/trademarks/${trademark._id}`);
  };

  return (
    <section className="w-full p-10 bg-white">
      <div className="max-w-7xl mx-auto ">
        {/* Optional heading */}
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-primary-dark mb-8 leading-tight">
          Our Trademarks
        </h3>

        <div className="relative overflow-hidden">
          <div className="trademark-marquee-track">
            <div className="trademark-marquee">
              {scrollingTrademarks.map((trademark, idx) => (
                <button
                  key={`${trademark._id}-${idx}`}
                  type="button"
                  onClick={() => handleLogoClick(trademark)}
                  className="focus:outline-none group"
                >
                  <div className="h-12 flex items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${trademark.logo}`}
                      alt={trademark.name}
                      className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
