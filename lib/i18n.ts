export type Language = "en" | "ro" | "ru";

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      title: "Premium Auto Detailing",
      subtitle: "Luxury care for your vehicle.",
      cta: "Book Now",
      secondary: "View Services",
    },
    services: {
      title: "Our Services",
      subtitle: "Professional detailing solutions.",
      viewAll: "View All Services",
    },
    gallery: {
      title: "Our Work",
      subtitle: "Before & after transformations.",
      before: "Before",
      after: "After",
    },
    why: {
      title: "Why Choose Us",
      subtitle: "Excellence in every detail.",
      items: [
        { title: "Premium Products", desc: "Only the finest materials." },
        { title: "Expert Team", desc: "Years of experience." },
        { title: "Satisfaction Guaranteed", desc: "100% quality promise." },
        { title: "Convenient Booking", desc: "Easy scheduling online." },
      ],
    },
    testimonials: {
      title: "Client Reviews",
      subtitle: "What our clients say.",
    },
    cta: {
      title: "Ready to Transform Your Car?",
      subtitle: "Book your appointment today.",
      button: "Get Started",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Premium auto detailing services.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with us.",
      form: {
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Your Message",
        send: "Send Message",
      },
      info: {
        phone: "Phone",
        email: "Email",
        address: "Address",
        hours: "Working Hours",
      },
    },
    about: {
      title: "About Us",
      subtitle: "Our story and mission.",
      mission: "Our Mission",
      missionText: "Delivering exceptional care.",
      team: "Our Team",
    },
  },
  ro: {
    nav: {
      home: "Acasă",
      services: "Servicii",
      gallery: "Galerie",
      about: "Despre",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      title: "Detailing Auto Premium",
      subtitle: "Îngrijire de lux pentru vehiculul tău.",
      cta: "Rezervă Acum",
      secondary: "Vezi Servicii",
    },
    services: {
      title: "Serviciile Noastre",
      subtitle: "Soluții profesionale de detailing.",
      viewAll: "Vezi Toate Serviciile",
    },
    gallery: {
      title: "Lucrările Noastre",
      subtitle: "Transformări înainte și după.",
      before: "Înainte",
      after: "După",
    },
    why: {
      title: "De Ce Să Ne Alegi",
      subtitle: "Excelență în fiecare detaliu.",
      items: [
        { title: "Produse Premium", desc: "Doar cele mai fine materiale." },
        { title: "Echipă Expert", desc: "Ani de experiență." },
        { title: "Satisfacție Garantată", desc: "Promisiune de calitate 100%." },
        { title: "Rezervare Convenabilă", desc: "Programare ușoară online." },
      ],
    },
    testimonials: {
      title: "Recenzii Clienți",
      subtitle: "Ce spun clienții noștri.",
    },
    cta: {
      title: "Gata să Transformi Mașina?",
      subtitle: "Rezervă programarea astăzi.",
      button: "Începe",
    },
    footer: {
      rights: "Toate drepturile rezervate.",
      tagline: "Servicii premium de detailing auto.",
    },
    contact: {
      title: "Contactează-ne",
      subtitle: "Ia legătura cu noi.",
      form: {
        name: "Numele Tău",
        email: "Adresa de Email",
        phone: "Număr de Telefon",
        message: "Mesajul Tău",
        send: "Trimite Mesaj",
      },
      info: {
        phone: "Telefon",
        email: "Email",
        address: "Adresă",
        hours: "Program de Lucru",
      },
    },
    about: {
      title: "Despre Noi",
      subtitle: "Povestea și misiunea noastră.",
      mission: "Misiunea Noastră",
      missionText: "Oferim îngrijire excepțională.",
      team: "Echipa Noastră",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      gallery: "Галерея",
      about: "О нас",
      contact: "Контакты",
      admin: "Админ",
    },
    hero: {
      title: "Премиум Детейлинг",
      subtitle: "Роскошный уход за вашим автомобилем.",
      cta: "Записаться",
      secondary: "Смотреть Услуги",
    },
    services: {
      title: "Наши Услуги",
      subtitle: "Профессиональные решения детейлинга.",
      viewAll: "Все Услуги",
    },
    gallery: {
      title: "Наши Работы",
      subtitle: "Трансформации до и после.",
      before: "До",
      after: "После",
    },
    why: {
      title: "Почему Мы",
      subtitle: "Совершенство в каждой детали.",
      items: [
        { title: "Премиум Продукты", desc: "Только лучшие материалы." },
        { title: "Команда Экспертов", desc: "Годы опыта." },
        { title: "Гарантия Качества", desc: "100% гарантия качества." },
        { title: "Удобная Запись", desc: "Легкое бронирование онлайн." },
      ],
    },
    testimonials: {
      title: "Отзывы Клиентов",
      subtitle: "Что говорят наши клиенты.",
    },
    cta: {
      title: "Готовы Преобразить Авто?",
      subtitle: "Запишитесь на прием сегодня.",
      button: "Начать",
    },
    footer: {
      rights: "Все права защищены.",
      tagline: "Премиум услуги автодетейлинга.",
    },
    contact: {
      title: "Связаться с Нами",
      subtitle: "Свяжитесь с нами.",
      form: {
        name: "Ваше Имя",
        email: "Электронная Почта",
        phone: "Номер Телефона",
        message: "Ваше Сообщение",
        send: "Отправить",
      },
      info: {
        phone: "Телефон",
        email: "Почта",
        address: "Адрес",
        hours: "Часы Работы",
      },
    },
    about: {
      title: "О Нас",
      subtitle: "Наша история и миссия.",
      mission: "Наша Миссия",
      missionText: "Обеспечиваем исключительный уход.",
      team: "Наша Команда",
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
