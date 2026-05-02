import { useParams, useNavigate } from "react-router-dom";
import { CATALOG } from "@/data/catalog";
import Icon from "@/components/ui/icon";

export default function CatalogCategory() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = CATALOG.find((c) => c.slug === slug);

  if (!category) {
    navigate("/");
    return null;
  }

  const scrollToContacts = () => {
    navigate("/#contacts");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#141414]">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-display text-xl font-bold tracking-widest uppercase text-[#141414]"
          >
            АТЛЕТ
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-body text-sm text-[#666] hover:text-[#141414] transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к каталогу
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16 h-[50vh] min-h-[380px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.img} alt={category.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-[#141414]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <nav className="flex items-center gap-2 text-white/40 font-body text-xs uppercase tracking-wide mb-4">
            <button onClick={() => navigate("/")} className="hover:text-white/70 transition-colors">Главная</button>
            <span>/</span>
            <button onClick={() => navigate("/#catalog")} className="hover:text-white/70 transition-colors">Каталог</button>
            <span>/</span>
            <span className="text-white/70">{category.title}</span>
          </nav>
          <div className="flex items-end gap-4">
            <div>
              {category.tag && (
                <span className="inline-block font-body text-[10px] tracking-widest uppercase bg-[#f97316] text-white px-2 py-1 mb-3">
                  {category.tag}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-white uppercase leading-none">
                {category.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT: photo + description + features */}
          <div className="lg:col-span-1">
            <img
              src={category.img}
              alt={category.title}
              className="w-full aspect-[4/3] object-cover mb-8"
            />
            <p className="font-body text-sm text-[#555] leading-loose mb-8">{category.fullDesc}</p>

            <h3 className="font-display text-lg font-medium uppercase mb-4">Характеристики</h3>
            <ul className="flex flex-col gap-2 mb-8">
              {category.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3 font-body text-sm text-[#444]">
                  <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full flex-shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>

            <h3 className="font-display text-lg font-medium uppercase mb-4">Преимущества</h3>
            <div className="flex flex-col gap-4">
              {category.features.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#141414]">
                    <Icon name={f.icon} size={14} className="text-[#f97316]" />
                  </div>
                  <span className="font-body text-sm text-[#444] leading-snug pt-1.5">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: products list */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-medium uppercase mb-6">Модели и цены</h2>
            <div className="flex flex-col gap-4">
              {category.products.map((product, i) => (
                <div
                  key={i}
                  className="group bg-white border border-[#e8e8e4] p-6 hover:border-[#f97316] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-medium uppercase mb-1">{product.name}</h3>
                      <p className="font-body text-sm text-[#666]">{product.desc}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
                      <span className="font-display text-xl font-semibold text-[#f97316] whitespace-nowrap">
                        {product.price}
                      </span>
                      <button
                        onClick={() => navigate("/?section=contacts")}
                        className="font-display text-xs font-medium tracking-widest uppercase bg-[#141414] text-white px-5 py-2.5 hover:bg-[#f97316] transition-colors duration-200 whitespace-nowrap"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-[#141414] p-8 flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="font-display text-xl font-medium uppercase text-white mb-1">Нужен индивидуальный проект?</h3>
                <p className="font-body text-sm text-white/50">Рассчитаем стоимость под ваши размеры и требования</p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="font-display text-sm font-medium tracking-widest uppercase bg-[#f97316] text-white px-8 py-3.5 hover:bg-white hover:text-[#141414] transition-colors duration-200 whitespace-nowrap"
              >
                Получить расчёт
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER CATEGORIES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-medium uppercase mb-8">Другие категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATALOG.filter((c) => c.slug !== slug).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/catalog/${cat.slug}`)}
                className="group border border-[#e8e8e4] text-left hover:border-[#f97316] hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#141414]/30 group-hover:bg-[#141414]/10 transition-colors" />
                </div>
                <div className="p-3 flex items-center gap-2">
                  <Icon name={cat.icon} size={14} className="text-[#f97316] flex-shrink-0" />
                  <span className="font-display text-xs font-medium uppercase leading-tight">{cat.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0d0d] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="font-display text-lg font-bold tracking-widest uppercase text-white">
            АТЛЕТ
          </button>
          <div className="font-body text-xs text-white/30 text-center">
            © 2009–2026 ООО «АТЛЕТ». Производство спортивных площадок
          </div>
        </div>
      </footer>
    </div>
  );
}