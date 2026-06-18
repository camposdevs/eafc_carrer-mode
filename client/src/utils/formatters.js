export function formatMoney(value) {
  if (!value) return "Não informado";

  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "EUR"
  });
}

export function formatDate(value) {
  if (!value) return "Sem data";

  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export function formatNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}