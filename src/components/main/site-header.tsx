import React, { useEffect } from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//abberantpawnpalette.com/23/5a/d6/235ad6b2de46117f95b93785b3b0198b.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on component unmount
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <MainNav items={siteConfig.mainNav} />
      {/* <MobileNav items={siteConfig.mainNav} className="md:hidden" /> */}
    </header>
  );
};

export default SiteHeader;
