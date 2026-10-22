"use client";
import Link from "next/link";


import { FormEvent, useMemo, useState } from "react";
import { formatBRL, products as initialProducts, type IconKey, type Product } from "@/data/products";

type AdminView = "dashboard" | "products" | "sales";

type Sale = {
  id: string;
  customer: string;
  product: string;
  category: "Menina" | "Menino" | "Bebê";
  brand: string;
  items: number;
  total: number;
  status: "Pago" | "Enviado" | "Aguardando";
  date: string;
};

const sales: Sale[] = [
  { id: "#BF-1048", customer: "Mariana Souza", product: "Vestido Flor de Lis", category: "Menina", brand: "Molekinha", items: 2, total: 154.8, status: "Pago", date: "Hoje, 10:42" },
  { id: "#BF-1047", customer: "Camila Oliveira", product: "Tênis com Luz Colorido", category: "Menino", brand: "Nike", items: 1, total: 129.9, status: "Enviado", date: "Hoje, 09:18" },
  { id: "#BF-1046", customer: "Rafael Martins", product: "Camisa Polo Listrada", category: "Menino", brand: "Adidas", items: 3, total: 219.7, status: "Pago", date: "Ontem, 18:26" },
  { id: "#BF-1045", customer: "Juliana Costa", product: "Vestido Poá de Festa", category: "Menina", brand: "Charpey", items: 1, total: 89.9, status: "Aguardando", date: "Ontem, 16:03" },
  { id: "#BF-1044", customer: "Ana Beatriz Lima", product: "Body Soft Nuvem", category: "Bebê", brand: "Pimpolho", items: 2, total: 184.8, status: "Enviado", date: "12 set, 14:52" },
];

const categoryOptions = ["Menina", "Menino", "Bebê"] as const;
const brandOptions = ["Todas as marcas", "Adidas", "Charpey", "Molekinha", "Nike", "Pimpolho"];
const iconOptions: IconKey[] = ["dress", "polo", "onesie", "shorts", "shoe", "jacket", "accessory"];

function Icon({ name }: { name: "grid" | "box" | "bag" | "plus" | "arrow" | "trend" | "menu" | "close" }) {
  const paths = {
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    trend: <><path d="m4 15 5-5 3 3 7-8" /><path d="M15 5h4v4" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };

  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: "pink" | "blue" | "ink" }) {
  const toneClasses = {
    pink: "bg-brand-pink-50 text-brand-pink-600",
    blue: "bg-brand-sky-100 text-brand-sky-600",
    ink: "bg-brand-ink text-white",
  };

  return (
    <article className={`rounded-xl2 p-5 shadow-card ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold opacity-75">{label}</p>
        <span className="rounded-full bg-white/70 p-2"><Icon name="trend" /></span>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 text-xs font-medium opacity-70">{detail}</p>
    </article>
  );
}

function StatusPill({ status }: { status: Sale["status"] }) {
  const styles = {
    Pago: "bg-brand-sky-100 text-brand-sky-600",
    Enviado: "bg-brand-pink-100 text-brand-pink-600",
    Aguardando: "bg-brand-cream text-brand-ink",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}

export function AdminPanel() {
  const [view, setView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", category: "Menina", price: "", stock: "", icon: "dress" as IconKey });
  const [saved, setSaved] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [saleFilter, setSaleFilter] = useState<"Todos" | Sale["status"]>("Todos");
  const [saleCategory, setSaleCategory] = useState("Todas as categorias");
  const [saleBrand, setSaleBrand] = useState("Todas as marcas");
  const [saleSearch, setSaleSearch] = useState("");

  const revenue = useMemo(() => sales.reduce((total, sale) => total + sale.total, 0), []);
  const averageTicket = revenue / sales.length;
  const visibleProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(productSearch.toLowerCase())),
    [products, productSearch],
  );
  const visibleSales = useMemo(
    () => sales.filter((sale) => {
      const matchesStatus = saleFilter === "Todos" || sale.status === saleFilter;
      const matchesCategory = saleCategory === "Todas as categorias" || sale.category === saleCategory;
      const matchesBrand = saleBrand === "Todas as marcas" || sale.brand === saleBrand;
      const query = saleSearch.toLowerCase();
      const matchesSearch = !query || sale.brand.toLowerCase().includes(query) || sale.product.toLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesBrand && matchesSearch;
    }),
    [saleBrand, saleCategory, saleFilter, saleSearch],
  );

  const navigate = (nextView: AdminView) => {
    setView(nextView);
    setMobileMenuOpen(false);
    setSaved(false);
  };

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(productForm.price.replace(",", "."));
    if (!productForm.name.trim() || !price) return;

    const newProduct: Product = {
      id: `${productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: productForm.name.trim(),
      category: productForm.category as Product["category"],
      price,
      installments: `2x de ${formatBRL(price / 2)}`,
      icon: productForm.icon,
      tint: productForm.category === "Menina" ? "pink" : "sky",
      badge: "Lançamento",
    };

    setProducts((current) => [newProduct, ...current]);
    setProductForm({ name: "", category: "Menina", price: "", stock: "", icon: "dress" });
    setSaved(true);
  };

  const navItems: { id: AdminView; label: string; icon: "grid" | "box" | "bag" }[] = [
    { id: "dashboard", label: "Visão geral", icon: "grid" },
    { id: "products", label: "Produtos", icon: "box" },
    { id: "sales", label: "Vendas", icon: "bag" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-brand-ink/10 bg-white px-6 py-7 transition-transform lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-black tracking-tight text-brand-pink-600">Bia Fashion</p>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sky-600">Painel da loja</p>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-full p-2 text-brand-ink lg:hidden" aria-label="Fechar menu"><Icon name="close" /></button>
        </div>

        <div className="mt-10 rounded-xl2 bg-brand-pink-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-pink-600">Bom dia, Bia</p>
          <p className="mt-2 text-sm leading-5 text-brand-ink/70">Sua loja teve um ótimo movimento nesta semana.</p>
        </div>

        <nav className="mt-9 space-y-2" aria-label="Navegação administrativa">
          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/40">Gerenciamento</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold transition ${view === item.id ? "bg-brand-pink-500 text-white shadow-soft" : "text-brand-ink/65 hover:bg-brand-sky-100 hover:text-brand-ink"}`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-7 left-6 right-6 border-t border-brand-ink/10 pt-5">
         <Link href="/" className="...">Voltar ao site</Link>
        </div>
      </aside>

      {mobileMenuOpen && <button type="button" className="fixed inset-0 z-30 bg-brand-ink/30 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu" />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-brand-ink/10 bg-white/95 px-4 backdrop-blur sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="rounded-lg p-2 text-brand-ink lg:hidden" aria-label="Abrir menu"><Icon name="menu" /></button>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-500">Administração</p>
              <h1 className="text-xl font-bold text-brand-ink">{view === "dashboard" ? "Visão geral" : view === "products" ? "Produtos" : "Vendas"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-sm sm:block"><strong className="block">Bia Fashion Kids</strong><span className="text-xs text-brand-ink/55">Administrador</span></span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-sky-400 font-bold text-white">B</span>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
          {view === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="text-sm font-medium text-brand-ink/55">Acompanhe o desempenho da sua operação.</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Olá, Bia <span aria-hidden="true">♡</span></h2></div>
                <button type="button" onClick={() => navigate("products")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-pink-500 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-pink-600"><Icon name="plus" /> Adicionar produto</button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Faturamento" value={formatBRL(revenue)} detail="+18,4% comparado ao mês passado" tone="pink" />
                <MetricCard label="Pedidos" value="128" detail="+12 pedidos nos últimos 7 dias" tone="blue" />
                <MetricCard label="Ticket médio" value={formatBRL(averageTicket)} detail="+6,8% comparado ao mês passado" tone="ink" />
                <MetricCard label="Produtos ativos" value={String(products.length)} detail="3 produtos com estoque baixo" tone="blue" />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <section className="rounded-xl2 bg-white p-5 shadow-card sm:p-6">
                  <div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-bold">Vendas recentes</h3><p className="mt-1 text-sm text-brand-ink/55">Acompanhe os últimos pedidos da loja.</p></div><button type="button" onClick={() => navigate("sales")} className="text-sm font-bold text-brand-pink-600 hover:text-brand-pink-800">Ver todas</button></div>
                  <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="border-b border-brand-ink/10 text-xs uppercase tracking-wider text-brand-ink/45"><tr><th className="pb-3 font-bold">Pedido</th><th className="pb-3 font-bold">Cliente</th><th className="pb-3 font-bold">Data</th><th className="pb-3 font-bold">Total</th><th className="pb-3 text-right font-bold">Status</th></tr></thead><tbody className="divide-y divide-brand-ink/5">{sales.slice(0, 4).map((sale) => <tr key={sale.id}><td className="py-4 font-bold">{sale.id}</td><td className="py-4">{sale.customer}</td><td className="py-4 text-brand-ink/55">{sale.date}</td><td className="py-4 font-bold">{formatBRL(sale.total)}</td><td className="py-4 text-right"><StatusPill status={sale.status} /></td></tr>)}</tbody></table></div>
                </section>
                <section className="rounded-xl2 bg-brand-sky-500 p-6 text-white shadow-card"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Resumo semanal</h3><Icon name="trend" /></div><p className="mt-8 text-4xl font-bold">R$ 3.842</p><p className="mt-2 text-sm text-white/75">faturados nos últimos 7 dias</p><div className="mt-8 flex h-28 items-end gap-2">{[35, 52, 44, 70, 58, 82, 96].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-white/80" style={{ height: `${height}%` }} /><span className="text-[10px] text-white/65">{["S", "T", "Q", "Q", "S", "S", "D"][index]}</span></div>)}</div></section>
              </div>
            </div>
          )}

          {view === "sales" && (
            <div className="space-y-6">
              <div className="grid gap-3 rounded-xl2 bg-white p-4 shadow-card sm:grid-cols-2 xl:grid-cols-4">
                <input value={saleSearch} onChange={(event) => setSaleSearch(event.target.value)} placeholder="Pesquisar marca ou produto" className="rounded-lg border border-brand-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100" />
                <select value={saleCategory} onChange={(event) => setSaleCategory(event.target.value)} className="rounded-lg border border-brand-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-pink-500"><option>Todas as categorias</option>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select>
                <select value={saleBrand} onChange={(event) => setSaleBrand(event.target.value)} className="rounded-lg border border-brand-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-pink-500">{brandOptions.map((brand) => <option key={brand}>{brand}</option>)}</select>
                <select value={saleFilter} onChange={(event) => setSaleFilter(event.target.value as "Todos" | Sale["status"])} className="rounded-lg border border-brand-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-pink-500"><option>Todos</option><option>Pago</option><option>Enviado</option><option>Aguardando</option></select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {categoryOptions.map((category) => {
                  const categorySales = visibleSales.filter((sale) => sale.category === category);
                  return <article key={category} className="rounded-xl2 bg-brand-pink-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-brand-pink-600">{category}</p><p className="mt-3 text-2xl font-bold text-brand-ink">{categorySales.reduce((total, sale) => total + sale.items, 0)} itens</p><p className="mt-1 text-xs text-brand-ink/60">{formatBRL(categorySales.reduce((total, sale) => total + sale.total, 0))} em vendas</p></article>;
                })}
              </div>
              <section className="rounded-xl2 bg-white p-5 shadow-card sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-brand-ink/55">Pedidos realizados na sua loja</p><h2 className="mt-1 text-2xl font-bold">Todas as vendas</h2></div><p className="text-sm font-bold text-brand-sky-600">{visibleSales.length} pedidos encontrados</p></div><div className="mt-7 overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-brand-ink/10 text-xs uppercase tracking-wider text-brand-ink/45"><tr><th className="pb-3 font-bold">Pedido</th><th className="pb-3 font-bold">Produto</th><th className="pb-3 font-bold">Marca</th><th className="pb-3 font-bold">Categoria</th><th className="pb-3 font-bold">Total</th><th className="pb-3 text-right font-bold">Status</th></tr></thead><tbody className="divide-y divide-brand-ink/5">{visibleSales.map((sale) => <tr key={sale.id}><td className="py-5 font-bold text-brand-pink-600">{sale.id}<span className="mt-1 block text-xs font-normal text-brand-ink/50">{sale.customer}</span></td><td className="py-5 font-medium">{sale.product}</td><td className="py-5 text-brand-ink/60">{sale.brand}</td><td className="py-5 text-brand-ink/60">{sale.category}</td><td className="py-5 font-bold">{formatBRL(sale.total)}</td><td className="py-5 text-right"><StatusPill status={sale.status} /></td></tr>)}</tbody></table></div>{visibleSales.length === 0 && <p className="mt-6 rounded-lg bg-brand-sky-100 px-4 py-3 text-sm font-medium text-brand-sky-600">Nenhuma venda encontrada com esses filtros.</p>}</section>
            </div>
          )}

          {view === "products" && (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <section className="rounded-xl2 bg-white p-5 shadow-card sm:p-7"><div><p className="text-sm text-brand-ink/55">Catálogo da loja</p><h2 className="mt-1 text-2xl font-bold">Adicionar produto</h2></div><form className="mt-7 space-y-4" onSubmit={handleProductSubmit}><label className="block text-sm font-bold">Nome do produto<input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} placeholder="Ex.: Vestido Jardim Encantado" className="mt-2 w-full rounded-lg border border-brand-ink/15 px-4 py-3 font-normal outline-none focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">Categoria<select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-3 py-3 font-normal outline-none focus:border-brand-pink-500">{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label><label className="block text-sm font-bold">Preço<input required value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} inputMode="decimal" placeholder="0,00" className="mt-2 w-full rounded-lg border border-brand-ink/15 px-4 py-3 font-normal outline-none focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100" /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">Estoque<input value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} inputMode="numeric" placeholder="0" className="mt-2 w-full rounded-lg border border-brand-ink/15 px-4 py-3 font-normal outline-none focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100" /></label><label className="block text-sm font-bold">Ícone<select value={productForm.icon} onChange={(event) => setProductForm({ ...productForm, icon: event.target.value as IconKey })} className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-3 py-3 font-normal outline-none focus:border-brand-pink-500">{iconOptions.map((icon) => <option key={icon}>{icon}</option>)}</select></label></div><button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-pink-500 px-4 py-3 font-bold text-white shadow-soft transition hover:bg-brand-pink-600"><Icon name="plus" /> Salvar produto</button>{saved && <p role="status" className="rounded-lg bg-brand-sky-100 px-4 py-3 text-sm font-bold text-brand-sky-600">Produto adicionado ao catálogo.</p>}</form></section><section className="rounded-xl2 bg-white p-5 shadow-card sm:p-7"><div className="flex items-end justify-between gap-4"><div><p className="text-sm text-brand-ink/55">{products.length} produtos cadastrados</p><h2 className="mt-1 text-2xl font-bold">Catálogo atual</h2></div><span className="rounded-full bg-brand-sky-100 px-3 py-1 text-xs font-bold text-brand-sky-600">Ativo</span></div><div className="mt-7 space-y-3">{products.slice(0, 8).map((product) => <div key={product.id} className="flex items-center gap-4 rounded-lg border border-brand-ink/10 p-3"><div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${product.tint === "pink" ? "bg-brand-pink-50 text-brand-pink-500" : "bg-brand-sky-100 text-brand-sky-600"}`}><Icon name="box" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{product.name}</p><p className="mt-1 text-xs text-brand-ink/55">{product.category} · {product.badge ?? "Ativo"}</p></div><p className="text-sm font-bold">{formatBRL(product.price)}</p></div>)}</div></section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
