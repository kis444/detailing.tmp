"use client";

import { Shield, Users, Award, Calendar } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

const icons = [Shield, Users, Award, Calendar];

export function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.why.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.why.subtitle}
          </p>
        </FadeIn>

        {/* Features grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.why.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={index}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
