import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPinned, Route as RouteIcon, Store, BrickWall, Sun } from 'lucide-react';
import { routes, type RouteInfo } from '../data/routes';
import { PageHeader } from '../components/PageHeader';
import { Callout } from '../components/Callout';
import { usePageTitle } from '../usePageTitle';

type Priority = 'distance' | 'walls' | 'activity';

const priorities: { id: Priority; label: string; help: string }[] = [
  { id: 'distance', label: 'Menor distância', help: 'Prioriza trajetos mais curtos' },
  { id: 'walls', label: 'Menos muros contínuos', help: 'Prioriza menor extensão de paredes fechadas' },
  { id: 'activity', label: 'Mais fachadas ativas', help: 'Prioriza entradas e atividades voltadas para a rua' },
];

function score(route: RouteInfo, priority: Priority) {
  switch (priority) {
    case 'distance':
      return route.distance;
    case 'walls':
      return route.wallMeters;
    case 'activity':
      return -route.activeFronts;
    default: {
      const unreachable: never = priority;
      return unreachable;
    }
  }
}

function priorityReason(priority: Priority) {
  switch (priority) {
    case 'walls':
      return 'A ordem considera apenas a extensão registrada de muros contínuos.';
    case 'distance':
      return 'A ordem considera apenas a distância total.';
    case 'activity':
      return 'A ordem considera apenas o número de fachadas ativas.';
    default: {
      const unreachable: never = priority;
      return unreachable;
    }
  }
}

export default function Compare() {
  usePageTitle('Comparar trajetos');
  const [priority, setPriority] = useState<Priority>('walls');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ordered = useMemo(
    () => [...routes].sort((a, b) => score(a, priority) - score(b, priority)),
    [priority],
  );
  const best = ordered[0];
  const selected = routes.find((route) => route.id === selectedId) ?? null;

  return (
    <>
      <PageHeader eyebrow="EXPLORE SUAS OPÇÕES" title="Compare trajetos">
        Escolha o que importa mais para você. Os dados abaixo são fictícios e servem para demonstrar a comparação.
      </PageHeader>

      <section className="panel">
        <h2 className="panel-title">1. Qual característica você quer priorizar?</h2>
        <fieldset className="priority-options">
          <legend className="sr-only">Prioridade da comparação</legend>
          {priorities.map((item) => (
            <label key={item.id} className={'priority' + (priority === item.id ? ' chosen' : '')}>
              <input
                type="radio"
                name="priority"
                value={item.id}
                checked={priority === item.id}
                onChange={() => {
                  setPriority(item.id);
                  setSelectedId(null);
                }}
              />
              <span>
                <strong>{item.label}</strong>
                <small>{item.help}</small>
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="section compact">
        <div className="section-row">
          <div>
            <h2>2. Conheça os caminhos</h2>
            <p className="muted">Três opções para um mesmo percurso hipotético</p>
          </div>
          <span className="pill">
            <RouteIcon size={16} aria-hidden="true" /> Simulação
          </span>
        </div>

        <div
          className="route-visual"
          role="img"
          aria-label="Diagrama ilustrativo de três caminhos entre um ponto de origem e um destino, sem correspondência com ruas reais"
        >
          <div className="endpoint">Início</div>
          <div className="route-lines">
            <div className="line line-a">A</div>
            <div className="line line-b">B</div>
            <div className="line line-c">C</div>
          </div>
          <div className="endpoint">Destino</div>
        </div>

        <div className="route-grid">
          {ordered.map((route, index) => {
            const isSelected = selected?.id === route.id;
            return (
              <article key={route.id} className={'route-card' + (isSelected ? ' selected' : '')}>
                <div className="route-card-top">
                  <span className="route-name">
                    <MapPinned size={18} aria-hidden="true" />
                    {route.name}
                  </span>
                  {index === 0 && <span className="tag">Melhor neste critério</span>}
                </div>
                <p>{route.description}</p>
                <div className="metrics">
                  <div>
                    <RouteIcon aria-hidden="true" />
                    <strong>{route.distance} m</strong>
                    <small>Distância</small>
                  </div>
                  <div>
                    <BrickWall aria-hidden="true" />
                    <strong>{route.wallMeters} m</strong>
                    <small>Muros contínuos</small>
                  </div>
                  <div>
                    <Store aria-hidden="true" />
                    <strong>{route.activeFronts}</strong>
                    <small>Fachadas ativas</small>
                  </div>
                </div>
                <p className="lighting">
                  <Sun size={17} aria-hidden="true" /> Iluminação: {route.lighting}
                </p>
                <button
                  className={'btn ' + (isSelected ? 'primary' : 'secondary')}
                  type="button"
                  onClick={() => setSelectedId(route.id)}
                  aria-pressed={isSelected}
                >
                  {isSelected ? (
                    <>
                      <Check size={18} aria-hidden="true" /> Trajeto selecionado
                    </>
                  ) : (
                    <>
                      Escolher este trajeto <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>

        <Callout live>
          <strong>
            {selected
              ? `Você escolheu ${selected.name}.`
              : `Pelo critério escolhido, ${best.name} aparece primeiro.`}
          </strong>
          <p>
            {priorityReason(priority)} Nenhum indicador garante segurança. Considere suas necessidades e as
            condições reais do local.
          </p>
        </Callout>

        {selected && (
          <section className="panel next-step" aria-labelledby="proximo-passo">
            <h2 id="proximo-passo">3. O que fazer com essa escolha</h2>
            <p>
              {selected.name}: {selected.description} Isso não é uma recomendação de segurança. É um resumo do
              que a simulação registra nesse caminho.
            </p>
            <ul>
              {selected.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="actions">
              <Link className="btn primary" to={`/avaliar?trecho=${encodeURIComponent(selected.name)}`}>
                Avaliar um trecho parecido
              </Link>
              <Link className="btn secondary" to="/bairro">
                Ver o panorama do bairro
              </Link>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
