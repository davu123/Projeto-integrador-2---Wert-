// Validação de CEP, endereço e coordenadas, usada por agências e pontos de entrega.

function vazio(valor) {
  return valor === undefined || valor === null || (typeof valor === 'string' && valor.trim() === '');
}

// CEP: aceita "70000-000", "70.000-000" ou "70000000". Guarda só os 8 dígitos.
function lerCep(valor) {
  if (vazio(valor)) return { valor: null };
  if (typeof valor !== 'string' && typeof valor !== 'number') {
    return { erro: 'Informe o CEP com 8 dígitos.' };
  }
  const texto = String(valor).trim();
  if (!/^[\d.\-\s]+$/.test(texto)) return { erro: 'Informe o CEP com 8 dígitos.' };
  const digitos = texto.replace(/\D/g, '');
  if (digitos.length !== 8) return { erro: 'Informe o CEP com 8 dígitos.' };
  return { valor: digitos };
}

function lerEndereco(valor, obrigatorio = false) {
  if (vazio(valor)) {
    return obrigatorio ? { erro: 'Informe o endereço.' } : { valor: null };
  }
  if (typeof valor !== 'string') return { erro: 'Informe o endereço como texto.' };
  const texto = valor.trim();
  if (texto.length > 200) return { erro: 'O endereço pode ter no máximo 200 caracteres.' };
  return { valor: texto };
}

function lerNumero(valor) {
  if (typeof valor === 'number') return valor;
  if (typeof valor === 'string' && /^\s*-?\d+(\.\d+)?\s*$/.test(valor)) return Number(valor);
  return NaN;
}

// Latitude e longitude em graus decimais (ponto como separador), juntas ou nenhuma.
// Guardadas com 6 casas decimais, cerca de 10 cm.
function lerCoordenadas(latitude, longitude, obrigatorio = false) {
  if (vazio(latitude) && vazio(longitude)) {
    return obrigatorio
      ? { erro: 'Informe a latitude e a longitude.' }
      : { latitude: null, longitude: null };
  }
  if (vazio(latitude) || vazio(longitude)) {
    return { erro: 'Informe a latitude e a longitude juntas, ou deixe as duas em branco.' };
  }
  const lat = lerNumero(latitude);
  const lng = lerNumero(longitude);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    return { erro: 'A latitude deve ser um número entre -90 e 90, com ponto decimal.' };
  }
  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    return { erro: 'A longitude deve ser um número entre -180 e 180, com ponto decimal.' };
  }
  return { latitude: Math.round(lat * 1e6) / 1e6, longitude: Math.round(lng * 1e6) / 1e6 };
}

module.exports = { vazio, lerCep, lerEndereco, lerCoordenadas };
