import { useState } from 'react';

const USERS = {
  admin: { pwd: 'admin', role: 'Administrador', label: 'Dueño', admin: true },
  jose:  { pwd: 'jose',  role: 'Encargado',     label: 'Jose Alvarez', admin: false },
};

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const doLogin = () => {
    const u = username.trim().toLowerCase();
    const p = password.trim();
    const cfg = USERS[u];
    
    if (!cfg || cfg.pwd !== p) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    
    setError('');
    onLogin({ id: u, ...cfg });
  };

  return (
    <div id="s-login" className="scr on">
      <div className="lcard">
        <div className="llogo">
          <img src="/mnt/user-data/uploads/4Client-Logo.png" alt="4Client" onError={(e) => e.target.style.display='none'} />
          <div className="llogo-t">4Client</div>
        </div>
        <p className="lsub">Sistema de Gestión Operativa<br />Fruver San Gabriel</p>
        
        <div className="role-hint">
          <strong>Dueño:</strong> usuario <code>admin</code> · contraseña <code>admin</code><br />
          <strong>Encargado:</strong> usuario <code>jose</code> · contraseña <code>jose</code>
        </div>
        
        <div className="fg">
          <label className="fl">Usuario</label>
          <input 
            className="fi" 
            type="text" 
            placeholder="admin / jose" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="fg">
          <label className="fl">Contraseña</label>
          <input 
            className="fi" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') doLogin(); }}
          />
        </div>
        
        <button className="bpri" onClick={doLogin}>Ingresar al sistema</button>
        
        {error && <div className="login-err" style={{ color: 'var(--r)', marginTop: '10px', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{error}</div>}
        
        <div className="lfooter">4client.shop · Fruver San Gabriel</div>
      </div>
    </div>
  );
}

export default Login;
