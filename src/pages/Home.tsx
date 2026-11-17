import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Footprints, Map, ShieldAlert } from 'lucide-react';
import { usePageTitle } from '../usePageTitle';

export default function Home() {
  usePageTitle('Início');

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">CITIZENTECH · CIDADES PARA PESSOAS</p>
          <h1>
            Seu caminho tem <em>mais</em> do que distância.
          </h1>
          <p className="lead">
            Muros extensos, fachadas fechadas e pouca atividade na rua podem mudar a experiência de
            quem caminha. Conheça as características de diferentes trajetos antes de escolher.
          </p>
          <div className="actions">
            <Link className="btn primary" to="/comparar">
              Comparar trajetos <ArrowRight size={19} aria-hidden="true" />
            </Link>
            <Link className="btn secondary" to="/avaliar">
              Avaliar um trecho
            </Link>
          </div>
          <p className="note">Demonstração com dados fictícios. Nenhuma rota é classificada como segura.</p>
        </div>
        <div
          className="hero-graphic"
          role="img"
          aria-label="Ilustração de duas ruas: uma com muro contínuo e outra com fachadas abertas e comércio"
        >
          <div className="scene-label">O que existe ao longo do caminho?</div>
          <div className="scene wall">
            <div className="street-icon">
              <ShieldAlert size={21} aria-hidden="true" />
            </div>
            <div className="wall-block" />
            <span>Muro contínuo</span>
          </div>
          <div className="scene active-street">
            <div className="store">CAFÉ</div>
            <div className="store">LIVRARIA</div>
            <div className="store">MERCADO</div>
            <span>Fachadas ativas</span>
          </div>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">COMO FUNCIONA</p>
        <h2>Mais informação para decidir por onde caminhar</h2>
        <div className="feature-grid">
          <article className="feature">
            <Map aria-hidden="true" />
            <h3>Compare opções</h3>
            <p>Veja distância e características observáveis de cada trajeto.</p>
          </article>
          <article className="feature">
            <Eye aria-hidden="true" />
            <h3>Entenda os critérios</h3>
            <p>Saiba o que são muros contínuos e fachadas ativas, sem notas de segurança.</p>
          </article>
          <article className="feature">
            <Footprints aria-hidden="true" />
            <h3>Compartilhe observações</h3>
            <p>Registre características de trechos e veja o registro no panorama do bairro.</p>
          </article>
        </div>
      </section>
    </>
  );
}
