"use client";

import { useState, useEffect } from "react";

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAALABQDAREAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAABAABA//EACAQAAIBAwQDAAAAAAAAAAAAAAECAAMEERQhMUFicZH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAP/EABgRAQEBAQEAAAAAAAAAAAAAAAACEgER/9oADAMBAAIRAxEAPwBKXTNwoz7hmVrqnumU7gR5Mr2metbx+RzI9oakSMYMClVie5IcmKf/2Q==";

export default function ProgressiveHero({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = "/hero-tarmac-1920.jpg";
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Blur placeholder — always visible immediately */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${BLUR_PLACEHOLDER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          opacity: loaded ? 0 : 1,
        }}
      />

      {/* Full-res hero — fades in when loaded */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(/hero-tarmac-1920.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
