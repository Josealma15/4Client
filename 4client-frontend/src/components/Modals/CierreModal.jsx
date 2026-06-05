import React, { useState } from 'react';
import { EL } from '../../data/mockData';

function CierreModal({ pedidos, onClose, currentDateStr, onCierreComplete }) {
  const [decisions, setDecisions] = useState({});

  const todos = pedidos.filter(p => p.estado !== 'papelera');
  const pagados = todos.filter(p => p.pagado);
  const pendientes = todos.filter(p => !p.pagado);
  const papelera = pedidos.filter(p => p.estado === 'papelera');

  const ef = pagados.reduce((acc, p) => acc + (p.pago === 'efectivo' || p.pago === 'casa' ? p.items.reduce((s, i) => s + (parseInt(i.p) || 0), 0) : 0), 0);
  const tr = pagados.reduce((acc, p) => acc + (p.pago === 'transferencia' ? p.items.reduce((s, i) => s + (parseInt(i.p) || 0), 0) : 0), 0);

  const fmt = (n) => '$' + (n || 0).toLocaleString('es-CO');

  const handleDecision = (id, val) => {
    setDecisions(prev => ({ ...prev, [id]: val }));
  };

  const handleGenerate = () => {
    for (let p of pendientes) {
      if (!decisions[p.id]) {
        alert('Debes seleccionar una solución para todos los pedidos pendientes antes de cerrar la caja.');
        return;
      }
    }
    
    // In a real app, we would update state here and generate CSV
    // For now we simulate success
    alert('✅ Caja cerrada exitosamente y CSV descargado (Simulación en React).');
    onCierreComplete();
  };

  return (
    <div className="moverlay on" id="m-cierre">
      <div className="cierre-win">
        <div className="mhead">
          <div>
            <div className="mtit">🏦 Cierre de Caja</div>
            <div className="msub">Resumen del día — Fruver San Gabriel</div>
          </div>
          <button className="mclose" onClick={onClose}>×</button>
        </div>
        <div className="mbody">
          <div className="cierre-sect">
            <div className="cierre-stit">💰 Recaudado hoy</div>
            <div className="cierre-row"><span>Efectivo / Cobra en casa</span><strong>{fmt(ef)}</strong></div>
            <div className="cierre-row"><span>Transferencias</span><strong>{fmt(tr)}</strong></div>
            <div className="cierre-total"><span>Total recaudado</span><span>{fmt(ef + tr)}</span></div>
          </div>

          <div className="cierre-sect">
            <div className="cierre-stit">📋 Estado de pedidos</div>
            <div className="cierre-row"><span>Total registrados</span><strong>{todos.length}</strong></div>
            <div className="cierre-row"><span>✅ Cobrados y cerrados</span><strong style={{ color: 'var(--v)' }}>{pagados.length}</strong></div>
            <div className="cierre-row"><span>⏳ Sin resolver</span><strong style={{ color: 'var(--a)' }}>{pendientes.length}</strong></div>
            <div className="cierre-row"><span>🗑 En papelera</span><strong style={{ color: 'var(--gt)' }}>{papelera.length}</strong></div>
          </div>

          {pendientes.length > 0 ? (
            <div className="cierre-sect" id="cierre-warn-sect" style={{ border: '2px solid #FFCC80', background: 'var(--ac)' }}>
              <div className="cierre-stit" style={{ color: 'var(--a)' }}>⚠ {pendientes.length} pedido(s) sin resolver</div>
              <div>
                {pendientes.map(p => {
                  const tot = p.items.reduce((s, i) => s + (parseInt(i.p) || 0), 0);
                  return (
                    <div key={p.id} className="warn-ord">
                      <div style={{ flex: 1 }}>
                        <strong>#{p.num}</strong> {p.cli}
                        <div style={{ fontSize: '12px', color: 'var(--gt)', marginTop: '2px' }}>
                          {EL[p.estado]} · {fmt(tot)}
                        </div>
                      </div>
                      <select className="warn-sel" value={decisions[p.id] || ''} onChange={(e) => handleDecision(p.id, e.target.value)}>
                        <option value="">¿Qué hacer?</option>
                        <option value="manana">📅 Pasar a mañana</option>
                        <option value="forzar_cierre">✅ Forzar pago/cierre</option>
                        <option value="cancelar">❌ Cancelar pedido</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="cierre-sect" style={{ borderColor: '#A5D6A7', background: '#E8F5E9' }}>
              <div className="cierre-stit" style={{ color: 'var(--a)' }}>⚠ ¡Todo resuelto!</div>
              <div style={{ textAlign: 'center', color: '#2E7D32', fontSize: '14px', fontWeight: '700', padding: '10px' }}>
                ✅ No hay pedidos pendientes. Excelente día!
              </div>
            </div>
          )}

          <div className="mactions">
            <button className="bsec" onClick={onClose}>Cancelar</button>
            <button className="bverde" onClick={handleGenerate}>📋 Generar informe del día</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CierreModal;
