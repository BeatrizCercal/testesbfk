"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { CategoryKey } from "@/data/products";
import { formatDateKey, promoLinkOptions, readPromos, savePromos, toDateKey, type Promo } from "@/data/promos";

const emptyForm = {
  date: "",
  title: "",
  description: "",
  discount: "",
  link: "" as "" | CategoryKey,
};

/** Cadastro das promoções exibidas no calendário da página inicial */
export function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm((current) => ({ ...current, date: toDateKey(new Date()) }));
    try {
      setPromos(readPromos());
    } catch {
      setMessage("As promoções salvas neste navegador estão inválidas.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      savePromos(promos);
    } catch {
      setMessage("Não foi possível salvar as promoções neste navegador.");
    }
  }, [promos, ready]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const discount = form.discount ? Number(form.discount) : undefined;
    if (discount !== undefined && (!Number.isFinite(discount) || discount <= 0 || discount > 100)) {
      setMessage("Informe um desconto entre 1 e 100%.");
      return;
    }

    const promo: Promo = {
      id: `promo-${Date.now()}`,
      date: form.date,
      title: form.title.trim(),
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
      ...(discount !== undefined ? { discount } : {}),
      ...(form.link ? { link: form.link } : {}),
    };

    setPromos((current) => [...current, promo].sort((a, b) => a.date.localeCompare(b.date)));
    setForm({ ...emptyForm, date: form.date });
    setMessage("Promoção cadastrada. Ela já aparece no calendário da página inicial.");
  };

  const handleRemove = (promo: Promo) => {
    setPromos((current) => current.filter((item) => item.id !== promo.id));
    setMessage(`"${promo.title}" foi removida.`);
  };

  return (
    <div className="admin-products-layout">
      <section className="admin-panel">
        <div className="admin-section-heading">
          <div>
            <h2>Adicionar promoção</h2>
            <p className="admin-muted">Escolha o dia e descreva a promoção que aparece no calendário.</p>
          </div>
        </div>
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <label>
              <span className="admin-field-label">Data</span>
              <input
                className="admin-input"
                type="date"
                required
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              />
            </label>
            <label>
              <span className="admin-field-label">Desconto (%)</span>
              <input
                className="admin-input"
                type="number"
                min="1"
                max="100"
                step="1"
                value={form.discount}
                onChange={(event) => setForm({ ...form, discount: event.target.value })}
                placeholder="Opcional"
              />
            </label>
          </div>
          <label>
            <span className="admin-field-label">Título</span>
            <input
              className="admin-input"
              required
              maxLength={60}
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Ex.: Dia do tênis"
            />
          </label>
          <label>
            <span className="admin-field-label">Descrição</span>
            <textarea
              className="admin-input admin-textarea"
              maxLength={180}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Opcional"
            />
          </label>
          <label>
            <span className="admin-field-label">Botão &quot;Ver produtos&quot; leva para</span>
            <select
              className="admin-input"
              value={form.link}
              onChange={(event) => setForm({ ...form, link: event.target.value as "" | CategoryKey })}
            >
              <option value="">Sem botão</option>
              {promoLinkOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button className="admin-button admin-button--pink" type="submit">
            Cadastrar promoção
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-section-heading">
          <div>
            <h2>Promoções cadastradas</h2>
            <p className="admin-muted">
              {promos.length} {promos.length === 1 ? "promoção" : "promoções"}
            </p>
          </div>
        </div>
        <div className="admin-product-list">
          {promos.map((promo) => (
            <article className="admin-product" key={promo.id}>
              <span className="admin-product__info">
                <strong>{promo.title}</strong>
                <small>
                  {formatDateKey(promo.date, { day: "2-digit", month: "2-digit", year: "numeric" })}
                  {promo.discount ? ` · ${promo.discount}% OFF` : ""}
                  {promo.link ? ` · ${promoLinkOptions.find((option) => option.value === promo.link)?.label}` : ""}
                </small>
                {promo.description && <small>{promo.description}</small>}
              </span>
              <button
                className="admin-icon-button admin-delete-button"
                type="button"
                onClick={() => handleRemove(promo)}
                aria-label={`Remover ${promo.title}`}
                title="Remover promoção"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                  <path d="M10 11v5m4-5v5" />
                </svg>
              </button>
            </article>
          ))}
          {promos.length === 0 && <p className="admin-empty">Nenhuma promoção cadastrada ainda.</p>}
        </div>
        <p className="admin-storage-note">As promoções ficam salvas neste navegador.</p>
        {message && (
          <p className="admin-form-message" role="status">
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
