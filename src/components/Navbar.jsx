  import React, { useEffect } from "react"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  const languages = {
      English: { code: "en", label: "English" },
      Hindi: { code: "hi", label: "हिन्दी" },
      Punjabi: { code: "pa", label: "ਪੰਜਾਬੀ" },
      Bengali: { code: "bn", label: "বাংলা" },
      Gujarati: { code: "gu", label: "ગુજરાતી" },
      Tamil: { code: "ta", label: "தமிழ்" },
      Telugu: { code: "te", label: "తెలుగు" },
    }
    

  const Navbar = () => {
      useEffect(() => {
          // Hide Google Translate elements on initial load
          const hideElements = () => {
            const banner = document.querySelector('.goog-te-banner-frame');
            const iframe = document.querySelector('iframe.goog-te-menu-frame');
            if (banner) banner.style.display = 'none';
            if (iframe) iframe.style.display = 'none';
          };
        
          // Run immediately and every second as a fallback
          hideElements();
          const interval = setInterval(hideElements, 1000);
        
          return () => clearInterval(interval);
        }, []);
        const changeLanguage = (langCode) => {
          // Set cookie for Google Translate
          document.cookie = `googtrans=/en/${langCode}; path=/`;
          
          // Force-clear any existing Google elements
          document.querySelector('.goog-te-banner-frame')?.remove();
          document.querySelector('iframe.goog-te-menu-frame')?.remove();
          
          // Reload after short delay to ensure cleanup
          setTimeout(() => window.location.reload(), 100);
        };

    return (
      <header className="w-full shadow-md bg-white px-4 py-3 flex justify-between items-center fixed">
        <div className="flex items-center gap-2">
          <img src="../src/assets/images/logo-transparent.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-green-700">Green Pulse</h1>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-green-700">Home</a>
          <a href="/chat" className="hover:text-green-700">Chat</a>
          <a href="/marketplace" className="hover:text-green-700">MarketPlace</a>
          <a href="/contact" className="hover:text-green-700">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">🌐 Language</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            {Object.entries(languages).map(([lang, { code, label }]) => (
    <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
      {label}
    </DropdownMenuItem>
  ))}

            </DropdownMenuContent>
          </DropdownMenu>

          {/* Google Translate container (required by the API) */}
          <div id="google_translate_element" style={{ display: "none" }} />
        </div>
      </header>
    )
  }

  export default Navbar
