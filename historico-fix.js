// Funções corrigidas para o histórico - STAR STUDIO CAR

function carregarAbaHistorico() {
    const lista = document.getElementById('listaHistorico');
    let historico = JSON.parse(localStorage.getItem('star_history') || '[]');
    
    if (historico.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:gray; padding: 20px;">Sem histórico de serviços.</p>';
        return;
    }

    // Ordenar por timestamp (mais recentes primeiro)
    historico.sort((a, b) => {
        return (b.timestamp || 0) - (a.timestamp || 0);
    });

    // Renderizar itens
    let html = '';
    historico.forEach((item, idx) => {
        html += `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-plate">🚗 ${item.placa}</span>
                    <span class="history-badge">CLIENTE</span>
                    <span class="history-date">${item.data || ''} ${item.hora || ''}</span>
                </div>
                <div class="history-client">${item.nome}</div>
                <div class="history-value">${item.total}</div>
                ${item.servicos ? `
                    <div class="history-services">
                        ${item.servicos.map(s => `<span class="history-service-badge">${s.icon} ${s.name}</span>`).join('')}
                    </div>
                ` : ''}
                <div style="margin-top:10px; display:flex; gap:8px">
                    <button class="btn-save" onclick="enviarProntoWhatsApp('${item.nome}', '${item.placa}', ${idx})">📱 Pronto</button>
                    <button class="trash-btn" onclick="deletarDoHistorico(${idx})">🗑️</button>
                </div>
            </div>
        `;
    });
    
    lista.innerHTML = html;
}

function deletarDoHistorico(idx) {
    if (confirm("Excluir este item do histórico?")) {
        let historico = JSON.parse(localStorage.getItem('star_history') || '[]');
        historico.splice(idx, 1);
        localStorage.setItem('star_history', JSON.stringify(historico));
        carregarAbaHistorico();
        showToast("Item removido");
    }
}

console.log('Funções do histórico carregadas com sucesso!');
