import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7ed97f7b-d903-45d9-b360-5838f20a94e0/files/77a7f189-c352-4cdc-9370-c01999b932a7.jpg";
const COMPLEX_IMG = "https://cdn.poehali.dev/projects/7ed97f7b-d903-45d9-b360-5838f20a94e0/files/e57642a4-f99e-4bf1-8f5e-26173f054c76.jpg";
const DETAIL_IMG = "https://cdn.poehali.dev/projects/7ed97f7b-d903-45d9-b360-5838f20a94e0/files/5b7d3d5b-cdf2-4e5e-a270-707ba3adf627.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О компании" },
  { id: "portfolio", label: "Портфолио" },
  { id: "certificates", label: "Сертификаты" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG_ITEMS = [
  {
    icon: "Dumbbell",
    title: "Турники и брусья",
    desc: "Профессиональные стойки из стали 40×40 мм с порошковым покрытием. Нагрузка до 200 кг.",
    specs: ["Сталь Ст3", "Нагрузка 200 кг", "Покрытие: порошок"],
    tag: "Популярное",
  },
  {
    icon: "Activity",
    title: "Воркаут-комплексы",
    desc: "Многофункциональные площадки 6×6 м и 10×10 м. Для дворовых и парковых зон.",
    specs: ["6×6 м / 10×10 м", "Монтаж 1–3 дня", "Гарантия 5 лет"],
    tag: "Хит",
  },
  {
    icon: "Target",
    title: "Детские площадки",
    desc: "Безопасные конструкции из оцинкованной стали. Соответствие ГОСТ Р 52169-2012.",
    specs: ["ГОСТ Р 52169-2012", "Оцинкованная сталь", "Резиновое покрытие"],
    tag: null,
  },
  {
    icon: "Layers",
    title: "Уличные тренажёры",
    desc: "Эллипсы, степперы, жимы — вандалозащищённое исполнение для общественных мест.",
    specs: ["Антивандальное", "Без обслуживания", "IP65"],
    tag: null,
  },
  {
    icon: "Zap",
    title: "Боксёрские стойки",
    desc: "Тяжёлые мешки, напольные груши — стационарные крепления на любое покрытие.",
    specs: ["Бетонирование", "Нагрузка 150 кг", "Сталь 60×60 мм"],
    tag: null,
  },
  {
    icon: "Shield",
    title: "Ограждения и покрытия",
    desc: "Резиновая плитка 40–60 мм, заборчики, бордюры — полный комплекс обустройства.",
    specs: ["40–60 мм толщина", "Цвета RAL", "Монтаж входит"],
    tag: null,
  },
];

const PORTFOLIO_ITEMS = [
  { city: "Москва", name: "ЖК «Северный парк»", area: "400 м²", year: "2024", img: HERO_IMG },
  { city: "Санкт-Петербург", name: "Парк Победы", area: "600 м²", year: "2024", img: COMPLEX_IMG },
  { city: "Краснодар", name: "ЖК «Солнечный»", area: "250 м²", year: "2023", img: DETAIL_IMG },
  { city: "Екатеринбург", name: "Парк «Каменные Палатки»", area: "800 м²", year: "2023", img: HERO_IMG },
  { city: "Казань", name: "Набережная Кабана", area: "350 м²", year: "2023", img: COMPLEX_IMG },
  { city: "Новосибирск", name: "Сквер Тружеников", area: "300 м²", year: "2022", img: DETAIL_IMG },
];

const CERTIFICATES = [
  {
    icon: "Award",
    title: "ГОСТ Р 52169-2012",
    desc: "Оборудование и покрытия детских игровых площадок",
    type: "Национальный стандарт",
    year: "Действует до 2026",
  },
  {
    icon: "ShieldCheck",
    title: "ISO 9001:2015",
    desc: "Система менеджмента качества производства",
    type: "Международный стандарт",
    year: "Действует до 2025",
  },
  {
    icon: "FileCheck",
    title: "ТР ТС 042/2017",
    desc: "О безопасности оборудования для детских игровых площадок",
    type: "Технический регламент",
    year: "Постоянно",
  },
  {
    icon: "BadgeCheck",
    title: "ГОСТ Р 55677-2013",
    desc: "Оборудование для уличной атлетики",
    type: "Национальный стандарт",
    year: "Действует",
  },
  {
    icon: "ClipboardCheck",
    title: "СНиП II-11-77",
    desc: "Нормы проектирования спортивных сооружений",
    type: "Строительные нормы",
    year: "Актуальный",
  },
  {
    icon: "Stamp",
    title: "Пожарный сертификат",
    desc: "Соответствие требованиям пожарной безопасности",
    type: "МЧС России",
    year: "Действует до 2026",
  },
];

const STATS = [
  { num: "1 200+", label: "Объектов сдано" },
  { num: "15", label: "Лет на рынке" },
  { num: "62", label: "Региона России" },
  { num: "5 лет", label: "Гарантия" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top <= 100);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#141414]">

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-display text-xl font-bold tracking-widest uppercase text-[#141414]"
          >
            АТЛЕТ
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-body text-sm font-medium tracking-wide transition-colors ${
                  activeSection === item.id ? "text-[#f97316] active" : "text-[#141414] hover:text-[#f97316]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block font-display text-xs font-medium tracking-widest uppercase bg-[#141414] text-white px-5 py-2.5 hover:bg-[#f97316] transition-colors duration-200"
          >
            Заказать
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-sm text-left py-1 border-b border-gray-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Воркаут площадка" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-body text-sm tracking-[0.2em] uppercase text-[#f97316] mb-4">
              Производитель с 2009 года
            </p>
            <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-7xl font-semibold text-white leading-none uppercase mb-6">
              Спортивные<br />площадки<br />
              <span className="text-[#f97316]">нового</span><br />уровня
            </h1>
            <p className="animate-fade-up delay-200 font-body text-base text-white/70 mb-10 max-w-lg leading-relaxed">
              Проектируем, производим и монтируем воркаут-площадки, детские и спортивные комплексы по всей России. Гарантия 5 лет.
            </p>
            <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="font-display text-sm font-medium tracking-widest uppercase bg-[#f97316] text-white px-8 py-3.5 hover:bg-white hover:text-[#141414] transition-colors duration-200"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="font-display text-sm font-medium tracking-widest uppercase border border-white/40 text-white px-8 py-3.5 hover:border-white transition-colors duration-200"
              >
                Наши проекты
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/50 animate-fade-in delay-500">
          <Icon name="ArrowDown" size={16} className="animate-bounce" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#141414] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-[#f97316]">{s.num}</div>
              <div className="font-body text-xs text-white/50 mt-1 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-[#f6f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f97316] mb-3">Продукция</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium uppercase leading-tight">
              Каталог<br />оборудования
            </h2>
            <div className="w-12 h-0.5 bg-[#f97316] mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group bg-white border border-[#e8e8e4] p-7 hover:border-[#f97316] hover:shadow-lg transition-all duration-300 cursor-pointer relative"
              >
                {item.tag && (
                  <span className="absolute top-5 right-5 font-body text-[10px] tracking-widest uppercase bg-[#f97316] text-white px-2 py-1">
                    {item.tag}
                  </span>
                )}
                <div className="w-10 h-10 flex items-center justify-center bg-[#f6f6f4] group-hover:bg-[#f97316] transition-colors duration-200 mb-5">
                  <Icon name={item.icon} size={20} className="text-[#141414] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-display text-xl font-medium uppercase mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed mb-5">{item.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {item.specs.map((spec) => (
                    <li key={spec} className="font-body text-xs text-[#888] flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#f97316] rounded-full flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[#141414] group-hover:text-[#f97316] transition-colors">
                  <span className="font-body text-xs tracking-widest uppercase font-medium">Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => scrollTo("contacts")}
              className="font-display text-sm font-medium tracking-widest uppercase border border-[#141414] px-10 py-3.5 hover:bg-[#141414] hover:text-white transition-colors duration-200"
            >
              Запросить прайс-лист
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f97316] mb-3">О нас</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium uppercase leading-tight mb-6">
                15 лет<br />строим<br />спорт
              </h2>
              <div className="w-12 h-0.5 bg-[#f97316] mb-8" />
              <p className="font-body text-sm text-[#555] leading-loose mb-6">
                Компания АТЛЕТ основана в 2009 году в Москве. Мы — производитель полного цикла: от разработки проекта и изготовления конструкций до монтажа и обслуживания. Собственные производственные мощности площадью 4 000 м² позволяют выполнять заказы любого масштаба.
              </p>
              <p className="font-body text-sm text-[#555] leading-loose mb-10">
                За 15 лет реализовано более 1 200 объектов в 62 регионах России — от дворовых площадок до крупных парковых комплексов для муниципальных заказчиков и застройщиков.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Factory", text: "Собственное производство 4 000 м²" },
                  { icon: "Truck", text: "Доставка по всей России" },
                  { icon: "Wrench", text: "Монтаж за 1–5 дней" },
                  { icon: "HeartHandshake", text: "Гарантийное обслуживание 5 лет" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <Icon name={f.icon} size={18} className="text-[#f97316] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-[#444] leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={DETAIL_IMG}
                alt="Производство"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#141414] text-white p-6 w-40">
                <div className="font-display text-3xl font-semibold text-[#f97316]">2009</div>
                <div className="font-body text-xs text-white/60 mt-1 uppercase tracking-wide">Год основания</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#f6f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f97316] mb-3">Проекты</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium uppercase leading-tight">
              Реализованные<br />объекты
            </h2>
            <div className="w-12 h-0.5 bg-[#f97316] mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {PORTFOLIO_ITEMS.map((p, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[4/3] cursor-pointer">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#141414]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="font-body text-xs text-[#f97316] tracking-widest uppercase mb-1">{p.city} · {p.year}</div>
                  <div className="font-display text-xl font-medium text-white uppercase">{p.name}</div>
                  <div className="font-body text-sm text-white/60 mt-1">{p.area}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#141414]/70 to-transparent group-hover:opacity-0 transition-opacity">
                  <div className="font-body text-xs text-white/70">{p.city}</div>
                  <div className="font-display text-sm text-white uppercase">{p.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-body text-sm text-[#888]">Показано 6 из 1 200+ реализованных объектов</p>
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f97316] mb-3">Документы</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium uppercase leading-tight">
              Сертификаты<br />и стандарты
            </h2>
            <div className="w-12 h-0.5 bg-[#f97316] mt-5" />
            <p className="font-body text-sm text-[#666] mt-5 max-w-xl leading-relaxed">
              Всё оборудование соответствует российским и международным стандартам качества и безопасности. Документы доступны для скачивания.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.title}
                className="group border border-[#e8e8e4] p-6 hover:border-[#f97316] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#f6f6f4] group-hover:bg-[#f97316] transition-colors duration-200">
                    <Icon name={cert.icon} size={18} className="text-[#141414] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-body text-[10px] text-[#aaa] tracking-wide uppercase">{cert.year}</span>
                </div>
                <h3 className="font-display text-lg font-medium uppercase mb-1">{cert.title}</h3>
                <p className="font-body text-xs text-[#f97316] tracking-wide mb-2">{cert.type}</p>
                <p className="font-body text-sm text-[#666] leading-relaxed mb-5">{cert.desc}</p>

                <button className="flex items-center gap-2 text-[#141414] group-hover:text-[#f97316] transition-colors">
                  <Icon name="Download" size={14} />
                  <span className="font-body text-xs tracking-widest uppercase font-medium">Скачать PDF</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#f6f6f4] border border-[#e8e8e4] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-medium uppercase mb-1">Нужны оригиналы документов?</h3>
              <p className="font-body text-sm text-[#666]">Вышлем заверенные копии по запросу или предоставим при встрече</p>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="font-display text-sm font-medium tracking-widest uppercase bg-[#141414] text-white px-8 py-3.5 hover:bg-[#f97316] transition-colors duration-200 whitespace-nowrap"
            >
              Запросить документы
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f97316] mb-3">Контакты</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium uppercase leading-tight mb-6">
                Обсудим<br />ваш проект
              </h2>
              <div className="w-12 h-0.5 bg-[#f97316] mb-10" />

              <div className="flex flex-col gap-7">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@atlet-sport.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Промышленная, 12" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–18:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-white/10">
                      <Icon name={c.icon} size={16} className="text-[#f97316]" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-white/40 tracking-wide uppercase mb-0.5">{c.label}</div>
                      <div className="font-body text-sm text-white">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-display text-xl font-medium uppercase mb-2">Оставить заявку</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-white/40 uppercase tracking-wide block mb-1.5">Имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/40 uppercase tracking-wide block mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-white/40 uppercase tracking-wide block mb-1.5">Организация</label>
                  <input
                    type="text"
                    placeholder="Название компании или ЖК"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-white/40 uppercase tracking-wide block mb-1.5">Описание задачи</label>
                  <textarea
                    rows={4}
                    placeholder="Тип площадки, площадь, пожелания..."
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="font-display text-sm font-medium tracking-widest uppercase bg-[#f97316] text-white py-4 hover:bg-white hover:text-[#141414] transition-colors duration-200"
                >
                  Отправить заявку
                </button>
                <p className="font-body text-xs text-white/30 text-center">
                  Ответим в течение 2 часов в рабочее время
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0d0d] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold tracking-widest uppercase text-white">АТЛЕТ</div>
          <div className="font-body text-xs text-white/30 text-center">
            © 2009–2026 ООО «АТЛЕТ». Производство спортивных площадок
          </div>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {NAV_ITEMS.slice(1).map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="font-body text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
