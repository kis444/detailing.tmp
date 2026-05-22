// Mock data store - In production, replace with MongoDB
// This simulates the database structure for the template

export interface Service {
  id: string;
  image: string;
  title: { en: string; ro: string; ru: string };
  description: { en: string; ro: string; ru: string };
  price: string;
}

export interface GalleryItem {
  id: string;
  before: string;
  after: string;
  title: { en: string; ro: string; ru: string };
}

export interface Testimonial {
  id: string;
  name: string;
  text: { en: string; ro: string; ru: string };
  rating: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: { en: string; ro: string; ru: string };
  hours: { en: string; ro: string; ru: string };
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
}

export interface SiteContent {
  heroTitle: { en: string; ro: string; ru: string };
  heroSubtitle: { en: string; ro: string; ru: string };
  aboutText: { en: string; ro: string; ru: string };
}

// Default mock data
export const defaultServices: Service[] = [
  {
    id: "1",
    image: "/images/service-exterior.jpg",
    title: {
      en: "Exterior Detailing",
      ro: "Detailing Exterior",
      ru: "Внешний Детейлинг",
    },
    description: {
      en: "Complete exterior wash and polish.",
      ro: "Spălare și lustruire exterioară completă.",
      ru: "Полная мойка и полировка кузова.",
    },
    price: "150 MDL",
  },
  {
    id: "2",
    image: "/images/service-interior.jpg",
    title: {
      en: "Interior Detailing",
      ro: "Detailing Interior",
      ru: "Внутренний Детейлинг",
    },
    description: {
      en: "Deep cleaning of all surfaces.",
      ro: "Curățare profundă a tuturor suprafețelor.",
      ru: "Глубокая чистка всех поверхностей.",
    },
    price: "200 MDL",
  },
  {
    id: "3",
    image: "/images/service-ceramic.jpg",
    title: {
      en: "Ceramic Coating",
      ro: "Acoperire Ceramică",
      ru: "Керамическое Покрытие",
    },
    description: {
      en: "Long-lasting paint protection.",
      ro: "Protecție de lungă durată a vopselei.",
      ru: "Долговременная защита краски.",
    },
    price: "500 MDL",
  },
  {
    id: "4",
    image: "/images/service-polish.jpg",
    title: {
      en: "Paint Correction",
      ro: "Corecție Vopsea",
      ru: "Коррекция Краски",
    },
    description: {
      en: "Remove scratches and swirls.",
      ro: "Eliminarea zgârieturilor și spiralelor.",
      ru: "Удаление царапин и разводов.",
    },
    price: "300 MDL",
  },
  {
    id: "5",
    image: "/images/service-engine.jpg",
    title: {
      en: "Engine Detailing",
      ro: "Detailing Motor",
      ru: "Детейлинг Двигателя",
    },
    description: {
      en: "Professional engine bay cleaning.",
      ro: "Curățare profesională a compartimentului motor.",
      ru: "Профессиональная чистка моторного отсека.",
    },
    price: "180 MDL",
  },
  {
    id: "6",
    image: "/images/service-wheels.jpg",
    title: {
      en: "Wheel Detailing",
      ro: "Detailing Roți",
      ru: "Детейлинг Колёс",
    },
    description: {
      en: "Wheels and tire restoration.",
      ro: "Restaurarea roților și anvelopelor.",
      ru: "Восстановление колёс и шин.",
    },
    price: "120 MDL",
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    id: "1",
    before: "/images/gallery-1-before.jpg",
    after: "/images/gallery-1-after.jpg",
    title: {
      en: "Full Exterior Restoration",
      ro: "Restaurare Exterioară Completă",
      ru: "Полная Реставрация Кузова",
    },
  },
  {
    id: "2",
    before: "/images/gallery-2-before.jpg",
    after: "/images/gallery-2-after.jpg",
    title: {
      en: "Interior Deep Clean",
      ro: "Curățare Interioară Profundă",
      ru: "Глубокая Чистка Салона",
    },
  },
  {
    id: "3",
    before: "/images/gallery-3-before.jpg",
    after: "/images/gallery-3-after.jpg",
    title: {
      en: "Paint Correction",
      ro: "Corecție Vopsea",
      ru: "Коррекция Краски",
    },
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alexandru M.",
    text: {
      en: "Exceptional service and attention to detail.",
      ro: "Serviciu excepțional și atenție la detalii.",
      ru: "Исключительный сервис и внимание к деталям.",
    },
    rating: 5,
  },
  {
    id: "2",
    name: "Maria P.",
    text: {
      en: "My car looks brand new again!",
      ro: "Mașina mea arată ca nouă din nou!",
      ru: "Моя машина выглядит как новая!",
    },
    rating: 5,
  },
  {
    id: "3",
    name: "Dmitri K.",
    text: {
      en: "Professional team, highly recommend.",
      ro: "Echipă profesionistă, recomand cu căldură.",
      ru: "Профессиональная команда, очень рекомендую.",
    },
    rating: 5,
  },
];

export const defaultContactInfo: ContactInfo = {
  phone: "+373 XX XXX XXX",
  email: "contact@autodetail.md",
  address: {
    en: "123 Main Street, Chisinau",
    ro: "Strada Principală 123, Chișinău",
    ru: "ул. Главная 123, Кишинёв",
  },
  hours: {
    en: "Mon-Sat: 9:00 - 18:00",
    ro: "Lun-Sâm: 9:00 - 18:00",
    ru: "Пн-Сб: 9:00 - 18:00",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/373",
  },
};

export const defaultSiteContent: SiteContent = {
  heroTitle: {
    en: "Premium Auto Detailing",
    ro: "Detailing Auto Premium",
    ru: "Премиум Детейлинг",
  },
  heroSubtitle: {
    en: "Luxury care for your vehicle.",
    ro: "Îngrijire de lux pentru vehiculul tău.",
    ru: "Роскошный уход за вашим автомобилем.",
  },
  aboutText: {
    en: "We are dedicated to providing the highest quality auto detailing services.",
    ro: "Suntem dedicați furnizării serviciilor de detailing auto de cea mai înaltă calitate.",
    ru: "Мы предоставляем услуги автодетейлинга высочайшего качества.",
  },
};
