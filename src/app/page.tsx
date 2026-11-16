import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { CatalogNews } from "@/components/CatalogNews";
import { ContactMaps } from "@/components/ContactMaps";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper-canvas">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <CatalogNews />
        <ContactMaps />
      </main>
      <Footer />
    </div>
  );
}

