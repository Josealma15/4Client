import React from 'react';

function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="moverlay on" id="m-ticket">
      <div className="mwin">
        <div className="mhead">
          <div>
            <div className="mtit" id="tk-tit">Conversación con {ticket.name}</div>
            <div className="msub" id="tk-sub">{ticket.phone} · Ticket WPP</div>
          </div>
          <button className="mclose" onClick={onClose}>×</button>
        </div>
        <div className="mbody">
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--rad)', padding: '8px 12px', marginBottom: '12px', fontSize: '12px', color: 'var(--gt)', fontWeight: '600' }}>
            🔒 Este es el registro inmutable de la conversación de WhatsApp. No se puede modificar.
          </div>
          
          <div className="chat-outer" id="tk-chat">
            {ticket.msgs.map((m, i) => (
              <div key={i} className={`cmsg ${m.from === 'c' ? 'c' : 'a'}`}>
                {m.text}
                <div className="ctm">{m.t}</div>
              </div>
            ))}
          </div>
          
          <div className="mactions" id="tk-actions">
            <button className="bsec" onClick={onClose}>Cerrar vista</button>
            <button className="bpri" onClick={() => alert('Abrir modal de nuevo pedido (Próximamente)')}>
              ➕ Crear pedido de este chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;
