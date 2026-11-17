import { NavLink, Route, Routes } from 'react-router-dom';
import {
  ChartNoAxesColumn,
  ClipboardList,
  Footprints,
  MapPinned,
  Route as RouteIcon,
} from 'lucide-react';
import Home from './pages/Home';
import Compare from './pages/Compare';
import Evaluate from './pages/Evaluate';
import Neighborhood from './pages/Neighborhood';

const links = [
  { to: '/', label: 'Início', icon: MapPinned, end: true },
  { to: '/comparar', label: 'Comparar', icon: RouteIcon, end: false },
  { to: '/avaliar', label: 'Avaliar trecho', icon: ClipboardList, end: false },
  { to: '/bairro', label: 'Meu bairro', icon: ChartNoAxesColumn, end: false },
];

export default function App() {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="shell header-inner">
          <NavLink className="brand" to="/" aria-label="Ruas Vivas, página inicial">
            <Footprints aria-hidden="true" /> Ruas<span>Vivas</span>
          </NavLink>
          <nav aria-label="Navegação principal">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="conteudo" className="shell main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparar" element={<Compare />} />
          <Route path="/avaliar" element={<Evaluate />} />
          <Route path="/bairro" element={<Neighborhood />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <span>Ruas Vivas · Protótipo acadêmico CitizenTech</span>
          <span>Dados ilustrativos — não é um serviço de segurança ou navegação em tempo real.</span>
        </div>
      </footer>
    </>
  );
}
