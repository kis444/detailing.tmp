"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { defaultSiteContent } from "@/lib/data";
import { Award, Users, Clock, Shield } from "lucide-react";

const teamMembers = [
  { name: "Ion Popescu", role: { en: "Founder & Lead Detailer", ro: "Fondator & Detailer Principal", ru: "Основатель и Главный Детейлер" } },
  { name: "Maria Ionescu", role: { en: "Senior Detailer", ro: "Detailer Senior", ru: "Старший Детейлер" } },
  { name: "Andrei Rusu", role: { en: "Ceramic Specialist", ro: "Specialist Ceramică", ru: "Специалист по Керамике" } },
];

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t.about.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="aspect-[4/3] rounded-xl bg-card border border-border overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t.about.mission}
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {defaultSiteContent.aboutText[language]}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-foreground">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.about.team}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {member.role[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Quality", desc: "Premium products only" },
              { icon: Users, title: "Trust", desc: "Transparent pricing" },
              { icon: Clock, title: "Punctuality", desc: "On-time delivery" },
              { icon: Award, title: "Excellence", desc: "Attention to detail" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
