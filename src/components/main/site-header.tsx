import { siteConfig } from "@/configs/site";
import React, { useEffect } from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
  useEffect(() => {
    // Dynamically inject the external script for monetization or analytics
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//pl24530115.profitablecpmrate.com/23/5a/d6/235ad6b2de46117f95b93785b3b0198b.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <MainNav items={siteConfig.mainNav} />
      {/* Uncomment below if you plan to include mobile navigation */}
      {/* <MobileNav items={siteConfig.mainNav} className="md:hidden" /> */}
    </header>
  );
};

export default SiteHeader;
