import { useState } from 'react';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('swimlane');

  return (
    <div id="s-admin" className="scr on">
      <div className="al">
        <header className="ah">
          <div className="ht">
            <div className="hlogo">
              <img src="/mnt/user-data/uploads/4Client-Logo.png" style={{ width: '34px', height: '34px', objectFit: 'contain' }} alt="4Client" onError={(e) => e.target.style.display='none'} />
              <span className="hlogo-t">4Client</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div className="huser">
                <div className={`uav ${user.admin ? 'adm' : ''}`} id="h-av">{user.label[0].toUpperCase()}</div>
                <div>
                  <div className="un" id="h-un">{user.label}</div>
                  <div className="ur2" id="h-rol">{user.role}</div>
                </div>
              </div>
              {user.admin && (
                <button className="bnew" id="btn-cierre" style={{ background: 'var(--az)', padding: '8px 14px', fontSize: '13px' }}>
                  🏦 Cierre de caja
                </button>
              )}
              <button className="bout" onClick={onLogout}>Salir</button>
            </div>
          </div>
          <div className="tabs">
            <button className={`tab ${activeTab === 'swimlane' ? 'on' : ''}`} onClick={() => setActiveTab('swimlane')}>📋 Tickets & Pedidos</button>
            {user.admin && (
              <button className={`tab ${activeTab === 'resumen' ? 'on' : ''}`} onClick={() => setActiveTab('resumen')}>📊 Resumen del día</button>
            )}
          </div>
        </header>
        
        <div className="ac">
          {activeTab === 'swimlane' && (
            <div id="adm-swimlane">
              <div className="khead">
                <div>
                  <div className="ktit">Tickets & Pedidos de despacho</div>
                  <div className="kmeta" id="panel-meta">Fase 1: Migración en progreso...</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="bnew">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Nuevo pedido
                  </button>
                </div>
              </div>
              <div className="slane-wrap" id="swimlane">
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gt)', fontSize: '14px', width: '100%' }}>
                  Tablero Kanban en construcción (Migrando componentes de React)...
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resumen' && (
             <div id="adm-resumen">
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gt)', fontSize: '14px' }}>
                  Dashboard de Resumen en construcción...
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
