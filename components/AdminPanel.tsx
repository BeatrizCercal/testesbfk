"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  babyGenders,
  formatBRL,
  isProduct,
  products as initialProducts,
  PRODUCT_STORAGE_KEY,
  type BabyGender,
  type IconKey,
  type Product,
} from "@/data/products";

type AdminView = "dashboard" | "products" | "sales";
type PeriodMode = "day" | "month" | "year";
type SaleStatus = "Pago" | "Enviado" | "Aguardando pagamento" | "Pagamento atrasado";

type Sale = {
  id: string;
  customer: string;
  product: string;
  category: Product["category"];
  brand: string;
  items: number;
  total: number;
  status: SaleStatus;
  soldAt: string;
};

const categoryOptions: Product["category"][] = ["Menina", "Menino", "Bebê"];
const brandOptions = ["Adidas", "Charpey", "Molekinha", "Nike", "Pimpolho"];
const iconOptions: { value: IconKey; label: string }[] = [
  { value: "shoe", label: "Calçado" },
  { value: "accessory", label: "Acessório" },
];
const shoeSizes = Array.from({ length: 23 }, (_, index) => String(index + 15));
const accessorySizes = ["Único", "P", "M", "G"];

function dateToInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeSaleDate(baseDate: Date, daysAgo: number, hour: number): string {
  const date = new Date(baseDate);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

function createExampleSales(today: Date): Sale[] {
  const previousMonth = new Date(today);
  previousMonth.setDate(1);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  previousMonth.setHours(14, 0, 0, 0);

  const previousYear = new Date(today);
  previousYear.setFullYear(previousYear.getFullYear() - 1);
  previousYear.setHours(11, 0, 0, 0);

  return [
    {
      id: "#BF-07",
      customer: "Mariana Souza",
      product: "Vestido Flor de Lis",
      category: "Menina",
      brand: "Molekinha",
      items: 2,
      total: 154.8,
      status: "Pago",
      soldAt: makeSaleDate(today, 0, 10),
    },
    {
      id: "#BF-06",
      customer: "Camila Oliveira",
      product: "Tênis com Luz Colorido",
      category: "Menino",
      brand: "Nike",
      items: 1,
      total: 129.9,
      status: "Enviado",
      soldAt: makeSaleDate(today, 0, 9),
    },
    {
      id: "#BF-05",
      customer: "Rafael Martins",
      product: "Sandália Infantil",
      category: "Menino",
      brand: "Molekinho",
      items: 2,
      total: 139.8,
      status: "Pago",
      soldAt: makeSaleDate(today, 1, 18),
    },
    {
      id: "#BF-04",
      customer: "Juliana Costa",
      product: "Laço Encantado",
      category: "Menina",
      brand: "Charpey",
      items: 1,
      total: 89.9,
      status: "Aguardando pagamento",
      soldAt: makeSaleDate(today, 3, 16),
    },
    {
      id: "#BF-02",
      customer: "Ana Beatriz Lima",
      product: "Tênis Infantil",
      category: "Bebê",
      brand: "Pimpolho",
      items: 2,
      total: 184.8,
      status: "Enviado",
      soldAt: previousMonth.toISOString(),
    },
    {
      id: "#BF-01",
      customer: "Beatriz Nunes",
      product: "Faixa de Cabelo Infantil",
      category: "Bebê",
      brand: "Pimpolho",
      items: 1,
      total: 74.9,
      status: "Pago",
      soldAt: previousYear.toISOString(),
    },
    {
      id: "#BF-03",
      customer: "Larissa Almeida",
      product: "Sandália Infantil",
      category: "Menina",
      brand: "Molekinha",
      items: 1,
      total: 79.9,
      status: "Pagamento atrasado",
      soldAt: makeSaleDate(today, 7, 12),
    },
  ];
}

function matchesPeriod(soldAt: string, selectedDate: string, mode: PeriodMode): boolean {
  if (!selectedDate) return false;

  const saleDate = dateToInputValue(new Date(soldAt));
  if (mode === "day") return saleDate === selectedDate;
  if (mode === "month") return saleDate.slice(0, 7) === selectedDate.slice(0, 7);
  return saleDate.slice(0, 4) === selectedDate.slice(0, 4);
}

function periodLabel(mode: PeriodMode): string {
  if (mode === "day") return "no dia selecionado";
  if (mode === "month") return "no mês selecionado";
  return "no ano selecionado";
}

function formatSaleDate(soldAt: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(soldAt));
}

function Icon({
  name,
}: {
  name: "grid" | "box" | "bag" | "plus" | "trend" | "menu" | "close" | "trash";
}) {
  const paths = {
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    box: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    trend: (
      <>
        <path d="m4 15 5-5 3 3 7-8" />
        <path d="M15 5h4v4" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
        <path d="M10 11v5m4-5v5" />
      </>
    ),
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function MetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "pink" | "blue";
}) {
  return (
    <article className={`admin-metric admin-metric--${tone}`}>
      <div className="admin-metric__icon">
        <Icon name="trend" />
      </div>
      <p className="admin-eyebrow">{label}</p>
      <p className="admin-metric__value">{value}</p>
      <p className="admin-muted">{detail}</p>
    </article>
  );
}

function StatusPill({ status }: { status: SaleStatus }) {
  const tone =
    status === "Pago" || status === "Enviado"
      ? "blue"
      : status === "Pagamento atrasado"
        ? "overdue"
        : "pending";
  return <span className={`admin-status admin-status--${tone}`}>{status}</span>;
}

export function AdminPanel() {
  const [view, setView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productsReady, setProductsReady] = useState(false);
  const [productMessage, setProductMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Menina" as Product["category"],
    price: "",
    icon: "shoe" as IconKey,
    description: "",
    sizes: [] as string[],
    image: "",
    gender: "Unissex" as BabyGender,
  });
  const [productSearch, setProductSearch] = useState("");
  const [sales, setSales] = useState<Sale[]>([]);
  const [periodMode, setPeriodMode] = useState<PeriodMode>("month");
  const [periodDate, setPeriodDate] = useState("");
  const [saleFilter, setSaleFilter] = useState<"Todos" | SaleStatus>("Todos");
  const [saleCategory, setSaleCategory] = useState("Todas as categorias");
  const [saleBrand, setSaleBrand] = useState("Todas as marcas");
  const [saleSearch, setSaleSearch] = useState("");

  useEffect(() => {
    const today = new Date();
    setPeriodDate(dateToInputValue(today));
    setSales(createExampleSales(today));

    try {
      const savedProducts = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
      if (savedProducts) {
        const parsedProducts: unknown = JSON.parse(savedProducts);
        if (!Array.isArray(parsedProducts) || !parsedProducts.every(isProduct)) {
          setProductMessage("Os produtos salvos neste navegador estão inválidos. Confira os dados antes de continuar.");
          return;
        }
        const supportedProducts = parsedProducts.filter(
          (product) => product.icon === "shoe" || product.icon === "accessory",
        );
        if (supportedProducts.length !== parsedProducts.length) {
          setProductMessage("O catálogo foi ajustado para exibir apenas calçados e acessórios.");
        }
        setProducts(supportedProducts);
      }
      setProductsReady(true);
    } catch {
      setProductMessage("Não foi possível carregar os produtos salvos neste navegador.");
    }
  }, []);

  useEffect(() => {
    if (!productsReady) return;

    try {
      window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    } catch {
      setProductMessage("Não foi possível salvar as alterações de produtos neste navegador.");
    }
  }, [products, productsReady]);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(productSearch.toLowerCase())),
    [products, productSearch],
  );

  const visibleSales = useMemo(
    () =>
      sales.filter((sale) => {
        const matchesSelectedPeriod = matchesPeriod(sale.soldAt, periodDate, periodMode);
        const matchesStatus = saleFilter === "Todos" || sale.status === saleFilter;
        const matchesCategory = saleCategory === "Todas as categorias" || sale.category === saleCategory;
        const matchesBrand = saleBrand === "Todas as marcas" || sale.brand === saleBrand;
        const query = saleSearch.trim().toLowerCase();
        const matchesSearch =
          !query ||
          sale.id.toLowerCase().includes(query) ||
          sale.customer.toLowerCase().includes(query) ||
          sale.brand.toLowerCase().includes(query) ||
          sale.product.toLowerCase().includes(query);

        return matchesSelectedPeriod && matchesStatus && matchesCategory && matchesBrand && matchesSearch;
      }),
    [periodDate, periodMode, saleBrand, saleCategory, saleFilter, saleSearch, sales],
  );

  const revenue = visibleSales.reduce((total, sale) => total + sale.total, 0);
  const orderCount = visibleSales.length;
  const itemCount = visibleSales.reduce((total, sale) => total + sale.items, 0);
  const riskSales = visibleSales.filter(
    (sale) => sale.status === "Aguardando pagamento" || sale.status === "Pagamento atrasado",
  );
  const riskRevenue = riskSales.reduce((total, sale) => total + sale.total, 0);
  const averageTicket = orderCount === 0 ? 0 : revenue / orderCount;
  const sortedRecentSales = [...visibleSales].sort(
    (first, second) => new Date(second.soldAt).getTime() - new Date(first.soldAt).getTime(),
  );

  const navigate = (nextView: AdminView) => {
    setView(nextView);
    setMobileMenuOpen(false);
  };

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(productForm.price);

    if (
      !productForm.name.trim() ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !productForm.description.trim() ||
      productForm.sizes.length === 0
    ) {
      setProductMessage("Preencha nome, descrição, preço e selecione ao menos um tamanho.");
      return;
    }

    const newProduct: Product = {
      id: `${productForm.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: productForm.name.trim(),
      category: productForm.category,
      ...(productForm.category === "Bebê" ? { gender: productForm.gender } : {}),
      price,
      installments: `2x de ${formatBRL(price / 2)}`,
      icon: productForm.icon,
      tint: productForm.category === "Menina" ? "pink" : "sky",
      badge: "Lançamento",
      description: productForm.description.trim(),
      sizes: productForm.sizes,
      ...(productForm.image ? { image: productForm.image } : {}),
    };

    setProducts((current) => [newProduct, ...current]);
    setProductForm({
      name: "",
      category: "Menina",
      price: "",
      icon: "shoe",
      description: "",
      sizes: [],
      image: "",
      gender: "Unissex",
    });
    setProductMessage("Produto cadastrado com sucesso.");
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setProductMessage("Escolha uma imagem JPG, PNG ou WEBP.");
      event.currentTarget.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      setProductMessage("A foto precisa ter no máximo 1 MB.");
      event.currentTarget.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result;
      if (typeof image !== "string" || !image.startsWith("data:image/")) {
        setProductMessage("Não foi possível ler a foto escolhida.");
        return;
      }
      setProductForm((current) => ({ ...current, image }));
      setProductMessage("");
    };
    reader.onerror = () => setProductMessage("Não foi possível carregar a foto escolhida.");
    reader.readAsDataURL(file);
  };

  const handleProductRemove = (product: Product) => {
    if (!window.confirm(`Remover "${product.name}" do catálogo?`)) return;
    setProducts((current) => current.filter((item) => item.id !== product.id));
    setProductMessage(`"${product.name}" foi removido do catálogo.`);
  };

  const navItems: { id: AdminView; label: string; icon: "grid" | "box" | "bag" }[] = [
    { id: "dashboard", label: "Visão geral", icon: "grid" },
    { id: "products", label: "Produtos", icon: "box" },
    { id: "sales", label: "Vendas", icon: "bag" },
  ];

  const periodInputType = periodMode === "day" ? "date" : periodMode === "month" ? "month" : "number";
  const periodInputValue =
    periodMode === "day"
      ? periodDate
      : periodMode === "month"
        ? periodDate.slice(0, 7)
        : periodDate.slice(0, 4);

  const renderPeriodFilter = () => (
    <div className="admin-period-filter">
      <label>
        <span className="admin-field-label">Somar vendas por</span>
        <select
          value={periodMode}
          onChange={(event) => setPeriodMode(event.target.value as PeriodMode)}
          className="admin-input"
        >
          <option value="day">Dia</option>
          <option value="month">Mês</option>
          <option value="year">Ano</option>
        </select>
      </label>
      <label>
        <span className="admin-field-label">
          {periodMode === "day" ? "Escolha o dia" : periodMode === "month" ? "Escolha o mês" : "Escolha o ano"}
        </span>
        <input
          className="admin-input"
          type={periodInputType}
          min={periodMode === "year" ? "2000" : undefined}
          max={periodMode === "year" ? String(new Date().getFullYear() + 1) : undefined}
          value={periodInputValue}
          onChange={(event) => {
            const value = event.target.value;
            setPeriodDate(
              !value ? "" : periodMode === "month" ? `${value}-01` : periodMode === "year" ? `${value}-01-01` : value,
            );
          }}
          aria-label="Data usada para calcular as vendas"
        />
      </label>
    </div>
  );

  const renderMetrics = () => (
    <div className="admin-metrics">
      <MetricCard
        label="Faturamento"
        value={formatBRL(revenue)}
        detail={`Total ${periodLabel(periodMode)}`}
        tone="pink"
      />
      <MetricCard
        label="Pedidos"
        value={String(orderCount)}
        detail={`Pedidos ${periodLabel(periodMode)}`}
        tone="blue"
      />
      <MetricCard
        label="Ticket médio"
        value={formatBRL(averageTicket)}
        detail="Faturamento dividido por pedidos"
        tone="pink"
      />
      <MetricCard
        label="Itens vendidos"
        value={String(itemCount)}
        detail={`Unidades ${periodLabel(periodMode)}`}
        tone="blue"
      />
    </div>
  );

  const renderRecentSales = (salesToShow: Sale[]) => (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {salesToShow.map((sale) => (
            <tr
              className={
                sale.status === "Aguardando pagamento" || sale.status === "Pagamento atrasado"
                  ? "admin-table__risk"
                  : undefined
              }
              key={sale.id}
            >
              <td className="admin-table__strong">{sale.id}</td>
              <td>{sale.customer}</td>
              <td>{formatSaleDate(sale.soldAt)}</td>
              <td className="admin-table__strong">{formatBRL(sale.total)}</td>
              <td><StatusPill status={sale.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {salesToShow.length === 0 && (
        <p className="admin-empty">Não há vendas para os filtros selecionados.</p>
      )}
    </div>
  );

  return (
    <div className="admin">
      <aside className={`admin-sidebar${mobileMenuOpen ? " admin-sidebar--open" : ""}`}>
        <div className="admin-brand">
          <span className="admin-brand__mark">B</span>
          <span>
            <strong>Bia Fashion Kids</strong>
            <small>Painel da loja</small>
          </span>
          <button
            className="admin-icon-button admin-sidebar__close"
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <Icon name="close" />
          </button>
        </div>

        <p className="admin-sidebar__label">Gerenciamento</p>
        <nav className="admin-nav" aria-label="Navegação administrativa">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`admin-nav__item${view === item.id ? " admin-nav__item--active" : ""}`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <Link className="admin-back-link" href="/">
          Voltar para a loja
        </Link>
      </aside>

      {mobileMenuOpen && (
        <button
          type="button"
          className="admin-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header__title">
            <button
              className="admin-icon-button admin-menu-button"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Icon name="menu" />
            </button>
            <div>
              <p className="admin-eyebrow">Administração</p>
              <h1>{view === "dashboard" ? "Visão geral" : view === "products" ? "Produtos" : "Vendas"}</h1>
            </div>
          </div>
          <div className="admin-user">
            <span className="admin-user__name">Bia Fashion Kids</span>
            <span className="admin-user__role">Administradora</span>
          </div>
        </header>

        <main className="admin-content">
          {view === "dashboard" && (
            <>
              <section className="admin-welcome">
                <div>
                  <p className="admin-eyebrow">Resumo da loja</p>
                  <h2>Olá!</h2>
                  <p className="admin-muted">Acompanhe seus pedidos, produtos e faturamento.</p>
                </div>
                <button className="admin-button admin-button--pink" type="button" onClick={() => navigate("products")}>
                  <Icon name="plus" />
                  Adicionar produto
                </button>
              </section>

              <section className="admin-panel admin-summary">
                <div className="admin-section-heading">
                  <div>
                    <h2>Indicadores de venda</h2>
                    <p className="admin-muted">Escolha um período para calcular os resultados.</p>
                  </div>
                </div>
                {renderPeriodFilter()}
                {renderMetrics()}
              </section>

              <section className="admin-panel admin-risk-panel" aria-labelledby="risk-title">
                <div className="admin-section-heading">
                  <div>
                    <h2 id="risk-title">Pagamentos que precisam de atenção</h2>
                    <p className="admin-muted">Pedidos aguardando pagamento ou com pagamento atrasado.</p>
                  </div>
                  <span className="admin-risk-total">
                    {riskSales.length} {riskSales.length === 1 ? "pedido" : "pedidos"} · {formatBRL(riskRevenue)}
                  </span>
                </div>
                {riskSales.length > 0 ? (
                  <div className="admin-risk-list">
                    {riskSales.map((sale) => (
                      <article className="admin-risk-item" key={sale.id}>
                        <span className="admin-risk-item__message">
                          <strong>{sale.id} · {sale.customer}</strong>
                          <small>{sale.product} · {formatSaleDate(sale.soldAt)}</small>
                        </span>
                        <StatusPill status={sale.status} />
                        <strong className="admin-risk-item__total">{formatBRL(sale.total)}</strong>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="admin-risk-clear">Nenhum pagamento pendente neste período.</p>
                )}
              </section>

              <section className="admin-panel">
                <div className="admin-section-heading">
                  <div>
                    <h2>Vendas do período</h2>
                    <p className="admin-muted">Pedidos mais recentes dentro dos filtros selecionados.</p>
                  </div>
                  <button className="admin-text-button" type="button" onClick={() => navigate("sales")}>
                    Ver todas as vendas
                  </button>
                </div>
                {renderRecentSales(sortedRecentSales.slice(0, 5))}
              </section>
            </>
          )}

          {view === "sales" && (
            <>
              <section className="admin-panel admin-summary">
                <div className="admin-section-heading">
                  <div>
                    <h2>Relatório de vendas</h2>
                    <p className="admin-muted">Filtre por período, status, categoria ou marca.</p>
                  </div>
                </div>
                <div className="admin-sales-filters">
                  {renderPeriodFilter()}
                  <label>
                    <span className="admin-field-label">Pesquisar</span>
                    <input
                      className="admin-input"
                      value={saleSearch}
                      onChange={(event) => setSaleSearch(event.target.value)}
                      placeholder="Pedido, cliente ou produto"
                    />
                  </label>
                  <label>
                    <span className="admin-field-label">Categoria</span>
                    <select
                      className="admin-input"
                      value={saleCategory}
                      onChange={(event) => setSaleCategory(event.target.value)}
                    >
                      <option>Todas as categorias</option>
                      {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="admin-field-label">Marca</span>
                    <select
                      className="admin-input"
                      value={saleBrand}
                      onChange={(event) => setSaleBrand(event.target.value)}
                    >
                      <option>Todas as marcas</option>
                      {brandOptions.map((brand) => <option key={brand}>{brand}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="admin-field-label">Status do pedido</span>
                    <select
                      className="admin-input"
                      value={saleFilter}
                      onChange={(event) => setSaleFilter(event.target.value as "Todos" | SaleStatus)}
                    >
                      <option>Todos</option>
                      <option>Pago</option>
                      <option>Enviado</option>
                      <option>Aguardando pagamento</option>
                      <option>Pagamento atrasado</option>
                    </select>
                  </label>
                </div>
                {renderMetrics()}
              </section>

              <section className="admin-panel">
                <div className="admin-section-heading">
                  <div>
                    <h2>Pedidos encontrados</h2>
                    <p className="admin-muted">{visibleSales.length} pedidos correspondem aos filtros.</p>
                  </div>
                </div>
                {renderRecentSales(sortedRecentSales)}
              </section>
            </>
          )}

          {view === "products" && (
            <div className="admin-products-layout">
              <section className="admin-panel">
                <div className="admin-section-heading">
                  <div>
                    <h2>Adicionar produto</h2>
                    <p className="admin-muted">Preencha os dados para incluir um item no catálogo.</p>
                  </div>
                </div>
                <form className="admin-product-form" onSubmit={handleProductSubmit}>
                  <label>
                    <span className="admin-field-label">Nome do produto</span>
                    <input
                      className="admin-input"
                      required
                      maxLength={80}
                      value={productForm.name}
                      onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                      placeholder="Ex.: Vestido Jardim Encantado"
                    />
                  </label>
                  <label>
                    <span className="admin-field-label">Descrição</span>
                    <textarea
                      className="admin-input admin-textarea"
                      required
                      maxLength={500}
                      value={productForm.description}
                      onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                      placeholder="Descreva o produto, o material e outros detalhes importantes."
                    />
                  </label>
                  <div className="admin-form-row">
                    <label>
                      <span className="admin-field-label">Público</span>
                      <select
                        className="admin-input"
                        value={productForm.category}
                        onChange={(event) =>
                          setProductForm({ ...productForm, category: event.target.value as Product["category"] })
                        }
                      >
                        {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                      </select>
                    </label>
                    <label>
                      <span className="admin-field-label">Preço (R$)</span>
                      <input
                        className="admin-input"
                        required
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={productForm.price}
                        onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
                        placeholder="0,00"
                      />
                    </label>
                  </div>
                  {productForm.category === "Bebê" && (
                    <label>
                      <span className="admin-field-label">Gênero do bebê</span>
                      <select
                        className="admin-input"
                        value={productForm.gender}
                        onChange={(event) =>
                          setProductForm({ ...productForm, gender: event.target.value as BabyGender })
                        }
                      >
                        {babyGenders.map((gender) => <option key={gender}>{gender}</option>)}
                      </select>
                    </label>
                  )}
                  <label>
                    <span className="admin-field-label">Tipo de produto</span>
                    <select
                      className="admin-input"
                      value={productForm.icon}
                      onChange={(event) =>
                        setProductForm({
                          ...productForm,
                          icon: event.target.value as IconKey,
                          sizes: [],
                        })
                      }
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </label>
                  <fieldset className="admin-size-field">
                    <legend className="admin-field-label">Grade de tamanhos</legend>
                    <div className="admin-size-grid">
                      {(productForm.icon === "shoe" ? shoeSizes : accessorySizes).map((size) => (
                        <label className="admin-size-option" key={size}>
                          <input
                            type="checkbox"
                            checked={productForm.sizes.includes(size)}
                            onChange={() =>
                              setProductForm((current) => ({
                                ...current,
                                sizes: current.sizes.includes(size)
                                  ? current.sizes.filter((item) => item !== size)
                                  : [...current.sizes, size],
                              }))
                            }
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="admin-photo-field">
                    <span className="admin-field-label">Foto do produto (opcional)</span>
                    <div className="admin-photo-field__row">
                      <label className="admin-photo-upload">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoChange}
                        />
                        <span className="admin-photo-upload__icon"><Icon name="plus" /></span>
                        <span>
                          <strong>{productForm.image ? "Trocar foto" : "Adicionar foto"}</strong>
                          <small>JPG, PNG ou WEBP · até 1 MB</small>
                        </span>
                      </label>
                      {productForm.image && (
                        <div className="admin-photo-preview">
                          <Image
                            src={productForm.image}
                            alt="Prévia da foto do produto"
                            width={88}
                            height={88}
                            unoptimized
                          />
                          <button
                            type="button"
                            onClick={() => setProductForm({ ...productForm, image: "" })}
                          >
                            Remover foto
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="admin-button admin-button--pink" type="submit">
                    <Icon name="plus" />
                    Salvar produto
                  </button>
                  {productMessage && <p className="admin-form-message" role="status">{productMessage}</p>}
                </form>
              </section>

              <section className="admin-panel">
                <div className="admin-section-heading admin-section-heading--products">
                  <div>
                    <h2>Catálogo de produtos</h2>
                    <p className="admin-muted">{products.length} produtos cadastrados</p>
                  </div>
                  <input
                    className="admin-input admin-product-search"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Buscar produto"
                    aria-label="Buscar produto"
                  />
                </div>

                <div className="admin-product-list">
                  {visibleProducts.map((product) => (
                    <article className="admin-product" key={product.id}>
                      {product.image ? (
                        <Image
                          className="admin-product__image"
                          src={product.image}
                          alt=""
                          width={48}
                          height={48}
                          unoptimized
                        />
                      ) : (
                        <span className={`admin-product__mark admin-product__mark--${product.tint}`}>
                          <Icon name="box" />
                        </span>
                      )}
                      <span className="admin-product__info">
                        <strong>{product.name}</strong>
                        <small>
                          {product.category}{product.gender ? ` (${product.gender})` : ""} · {iconOptions.find((icon) => icon.value === product.icon)?.label}
                          {product.sizes?.length ? ` · Tamanhos ${product.sizes.join(", ")}` : ""}
                        </small>
                        {product.description && <small>{product.description}</small>}
                      </span>
                      <strong className="admin-product__price">{formatBRL(product.price)}</strong>
                      <button
                        className="admin-icon-button admin-delete-button"
                        type="button"
                        onClick={() => handleProductRemove(product)}
                        aria-label={`Remover ${product.name}`}
                        title="Remover produto"
                      >
                        <Icon name="trash" />
                      </button>
                    </article>
                  ))}
                  {visibleProducts.length === 0 && (
                    <p className="admin-empty">Nenhum produto encontrado. Ajuste a busca ou cadastre um produto.</p>
                  )}
                </div>
                <p className="admin-storage-note">As alterações do catálogo ficam salvas neste navegador.</p>
                {productMessage && <p className="admin-form-message" role="status">{productMessage}</p>}
              </section>
            </div>
          )}

          <p className="admin-demo-note">
            Vendas de demonstração. Para consultar vendas reais, conecte este painel à plataforma da loja.
          </p>
        </main>
      </div>
    </div>
  );
}
