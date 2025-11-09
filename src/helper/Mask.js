export function maskTelefone(valor) {
  valor = valor.replace(/\D/g, "");
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 10) {
    return valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (valor.length > 5) {
    return valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (valor.length > 2) {
    return valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  } else if (valor.length > 0) {
    return valor.replace(/(\d*)/, "($1");
  }
  return valor;
}

export function maskReal(valor) {
  valor = valor.replace(/\D/g, "");
  const numero = Number(valor) / 100;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarReal(valor) {
  if (valor === null || valor === undefined || valor === "") return "";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}