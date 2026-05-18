import api from './api';

export async function listarDestinacoes() {
  return await api.get('/destinacoes');
}

export async function buscarDestinacaoPorId(id) {
  return await api.get(`/destinacoes/${id}`);
}

export async function criarDestinacao(data) {
  return await api.post('/destinacoes', data);
}

export async function atualizarDestinacao(id, data) {
  return await api.put(`/destinacoes/${id}`, data);
}

export async function excluirDestinacao(id) {
  return await api.delete(`/destinacoes/${id}`);
}

async function handleSubmit(e) {
  e.preventDefault();
  setMensagem('');
  setErro('');

  try {
    if (!form.equipamento_id || !form.empresa || !form.data) {
      setErro('Preencha equipamento, empresa e data.');
      return;
    }

    const payload = {
      equipamento_id: Number(form.equipamento_id),
      tipo_destino: form.tipo_destino,
      empresa: form.empresa.trim(),
      data: form.data,
      certificado_url: form.certificado_url?.trim() || null,
    };

    console.log('Payload enviado para /destinacoes:', payload);

    let response;
    if (editandoId) {
      response = await atualizarDestinacao(editandoId, payload);
      setMensagem(response.message || 'Destinação atualizada com sucesso.');
    } else {
      response = await criarDestinacao(payload);
      setMensagem(response.message || 'Destinação criada com sucesso.');
    }

    limparFormulario();
    await carregarTudo();
  } catch (error) {
    console.error('Erro detalhado ao salvar destinação:', error);
    setErro(error.message || 'Erro ao salvar destinação.');
  }
}
