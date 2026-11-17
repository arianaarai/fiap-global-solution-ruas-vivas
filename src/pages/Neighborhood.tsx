import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrickWall, Store, Route as RouteIcon } from 'lucide-react';
import { routes } from '../data/routes';
import { loadEvaluations, type Evaluation } from '../data/evaluations';
import { PageHeader } from '../components/PageHeader';
import { Callout } from '../components/Callout';
import { usePageTitle } from '../usePageTitle';

type Filter = 'all' | 'walls' | 'active';

function routeMatchesFilter(filter: Filter, wallMeters: number, activeFronts: number) {
  switch (filter) {
    case 'all':
      return true;
    case 'walls':
      return wallMeters >= 200;
    case 'active':
      return activeFronts >= 6;
    default: {
      const unreachable: never = filter;
      return unreachable;
    }
  }
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function newestFirst(items: Evaluation[]) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftTime = Date.parse(left.item.createdAt);
      const rightTime = Date.parse(right.item.createdAt);
      const leftValue = Number.isNaN(leftTime) ? 0 : leftTime;
      const rightValue = Number.isNaN(rightTime) ? 0 : rightTime;
      if (leftValue === rightValue) return right.index - left.index;
      return rightValue - leftValue;
    })
    .map(({ item }) => item);
}

export default function Neighborhood() {
  usePageTitle('Meu bairro');
  const [filter, setFilter] = useState<Filter>('all');
  const [evaluations] = useState<Evaluation[]>(() => newestFirst(loadEvaluations()));
  const filtered = routes.filter((route) =>
    routeMatchesFilter(filter, route.wallMeters, route.activeFronts),
  );
  const wallMeters = routes.reduce((sum, route) => sum + route.wallMeters, 0);
  const activeFronts = routes.reduce((sum, route) => sum + route.activeFronts, 0);

  return (
    <>
      <PageHeader eyebrow="PANORAMA DO TERRITÓRIO" title="Entenda o bairro">
        Explore características dos trajetos usados na demonstração. Todos os números dos exemplos são simulados.
      </PageHeader>

      <div className="stat-grid">
        <div className="stat">
          <RouteIcon aria-hidden="true" />
          <strong>{routes.length}</strong>
          <span>Trajetos de exemplo</span>
        </div>
        <div className="stat">
          <BrickWall aria-hidden="true" />
          <strong>{wallMeters} m</strong>
          <span>Muros contínuos somados</span>
        </div>
        <div className="stat">
          <Store aria-hidden="true" />
          <strong>{activeFronts}</strong>
          <span>Fachadas ativas registradas</span>
        </div>
      </div>

      <section className="panel">
        <div className="section-row">
          <div>
            <h2 className="panel-title">Trechos de exemplo</h2>
            <p className="muted">Filtre para observar padrões na simulação</p>
          </div>
          <div className="field compact-field">
            <label htmlFor="filtro">Mostrar</label>
            <select
              id="filtro"
              value={filter}
              onChange={(event) => setFilter(event.target.value as Filter)}
            >
              <option value="all">Todos os trajetos</option>
              <option value="walls">Muros contínuos ≥ 200 m</option>
              <option value="active">6 ou mais fachadas ativas</option>
            </select>
          </div>
        </div>
        <p className="filter-result" role="status" aria-live="polite">
          {filtered.length === 1
            ? '1 trecho de exemplo neste filtro.'
            : `${filtered.length} trechos de exemplo neste filtro.`}
        </p>
        <div className="data-list">
          {filtered.map((route) => (
            <div className="data-item" key={route.id}>
              <strong>{route.name}</strong>
              <span>{route.distance} m de distância</span>
              <span>{route.wallMeters} m de muros</span>
              <span>{route.activeFronts} fachadas ativas</span>
            </div>
          ))}
        </div>
        <Callout>
          <p>
            Indicadores de infraestrutura não são avaliações de criminalidade ou garantias de segurança. O
            objetivo é apoiar a leitura do espaço urbano.
          </p>
        </Callout>
      </section>

      <section className="panel local-panel" aria-labelledby="observacoes-locais">
        <h2 id="observacoes-locais" className="panel-title">
          Observações deste navegador
        </h2>
        <p className="muted">
          {evaluations.length === 0
            ? 'Nenhuma observação salva ainda.'
            : `${evaluations.length} ${evaluations.length === 1 ? 'observação salva' : 'observações salvas'} só neste aparelho.`}{' '}
          Não são verificadas e não entram nos números da simulação.
        </p>

        {evaluations.length === 0 ? (
          <p className="local-empty">
            Registre o que você viu em um trecho para essa lista deixar de ficar vazia.{' '}
            <Link to="/avaliar">Avaliar um trecho</Link>
          </p>
        ) : (
          <div className="data-list">
            {evaluations.map((item, index) => {
              const when = formatWhen(item.createdAt);
              return (
                <article className="local-item" key={`${item.createdAt}-${item.name}-${index}`}>
                  <div className="local-item-top">
                    <strong>{item.name}</strong>
                    {when ? <span className="muted">Registrada em {when}</span> : null}
                  </div>
                  <p>
                    Muros: {item.walls}. Iluminação: {item.lighting}. Fachadas: {item.activity}.
                  </p>
                  {item.comment ? <p className="local-comment">{item.comment}</p> : null}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
