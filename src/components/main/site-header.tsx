"use client";

import { siteConfig } from "@/configs/site";
import React from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
  // Dynamically load the script on initial render
  if (typeof window !== "undefined") {
    const scriptId = "profitable-cpm-script";
    
    // Check if the script is already added to avoid duplicates
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//pl24530115.profitablecpmrate.com/23/5a/d6/235ad6b2de46117f95b93785b3b0198b.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <MainNav items={siteConfig.mainNav} />
    </header>
  );
};

export default SiteHeader;
