import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { usuario } = useAuth();

  const cards = [
    { icon: '👤', titulo: 'Usuários',  link: '/usuarios' },
    { icon: '🐶', titulo: 'Pets',      link: '/pets' },
    { icon: '📋', titulo: 'Adoções',   link: '/adocoes' },
    { icon: '📊', titulo: 'Relatório', link: '/relatorio' },
  ];

  return (
    <div>
      <h2 className="mb-4">Bem-vindo, {usuario?.nome}! 🐾</h2>
      <div className="row g-4">
        {cards.map(card => (
          <div className="col-md-3" key={card.link}>
            <div className="card text-center p-4 shadow-sm h-100">
              <div style={{ fontSize: '3rem' }}>{card.icon}</div>
              <h5 className="mt-2">{card.titulo}</h5>
              <Link to={card.link} className="btn mt-3 text-white" style={{ backgroundColor: '#e8973c' }}>
                Acessar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
