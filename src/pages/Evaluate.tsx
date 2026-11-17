import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { saveEvaluation } from '../data/evaluations';
import { usePageTitle } from '../usePageTitle';

type Entry = {
  name: string;
  walls: string;
  lighting: string;
  activity: string;
  comment: string;
};

type FieldName = 'name' | 'walls' | 'lighting' | 'activity';

const empty: Entry = { name: '', walls: '', lighting: '', activity: '', comment: '' };

const fieldMeta: { id: FieldName; inputId: string; message: string }[] = [
  { id: 'name', inputId: 'trecho', message: 'Informe o nome ou a referência do trecho.' },
  { id: 'walls', inputId: 'muros', message: 'Selecione a presença de muros contínuos.' },
  { id: 'lighting', inputId: 'luz', message: 'Selecione a iluminação observada.' },
  { id: 'activity', inputId: 'atividade', message: 'Selecione as fachadas com entradas ou comércio.' },
];

function validate(entry: Entry): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of fieldMeta) {
    if (!entry[field.id].trim()) errors[field.id] = field.message;
  }
  return errors;
}

export default function Evaluate() {
  usePageTitle('Avaliar trecho');
  const [params] = useSearchParams();
  const prefilled = (params.get('trecho') ?? '').trim().slice(0, 100);
  const [entry, setEntry] = useState<Entry>({ ...empty, name: prefilled });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [savedName, setSavedName] = useState<string | null>(null);
  const [storageError, setStorageError] = useState(false);

  function change(field: keyof Entry, value: string) {
    setEntry((current) => ({ ...current, [field]: value }));
    setSavedName(null);
    setStorageError(false);
    if (field !== 'comment') {
      setErrors((current) => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(entry);
    setErrors(nextErrors);
    setSavedName(null);
    setStorageError(false);

    const firstInvalid = fieldMeta.find((field) => nextErrors[field.id]);
    if (firstInvalid) {
      document.getElementById(firstInvalid.inputId)?.focus();
      return;
    }

    const saved = saveEvaluation({
      name: entry.name.trim(),
      walls: entry.walls,
      lighting: entry.lighting,
      activity: entry.activity,
      comment: entry.comment.trim(),
    });

    if (!saved) {
      setStorageError(true);
      return;
    }

    setSavedName(entry.name.trim());
    setEntry(empty);
  }

  const errorMessages = fieldMeta.flatMap((field) => (errors[field.id] ? [errors[field.id]] : []));

  return (
    <>
      <PageHeader eyebrow="CONTRIBUIÇÃO CIDADÃ" title="Avalie um trecho">
        Compartilhe características que você observou em uma rua. Evite incluir nomes de pessoas ou dados pessoais.
      </PageHeader>
      <div className="form-layout">
        <section className="panel">
          <h2 className="panel-title">Conte o que você observou</h2>
          <form onSubmit={submit} noValidate>
            {errorMessages.length > 0 && (
              <div className="form-alert" role="alert">
                <strong>Revise os campos obrigatórios antes de registrar.</strong>
                <ul>
                  {errorMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </div>
            )}
            {storageError && (
              <p className="form-alert" role="alert">
                Não foi possível salvar neste navegador. O registro continua só neste aparelho e não foi enviado.
              </p>
            )}

            <div className="field">
              <label htmlFor="trecho">Nome ou referência do trecho *</label>
              <input
                id="trecho"
                maxLength={100}
                placeholder="Ex.: Rua Exemplo, próximo à praça"
                value={entry.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'trecho-erro' : undefined}
                onChange={(event) => change('name', event.target.value)}
              />
              {errors.name && (
                <p id="trecho-erro" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="muros">Presença de muros contínuos *</label>
              <select
                id="muros"
                value={entry.walls}
                aria-invalid={Boolean(errors.walls)}
                aria-describedby={errors.walls ? 'muros-erro' : undefined}
                onChange={(event) => change('walls', event.target.value)}
              >
                <option value="">Selecione</option>
                <option>Não observei</option>
                <option>Trechos curtos</option>
                <option>Trechos longos</option>
                <option>Não sei informar</option>
              </select>
              {errors.walls && (
                <p id="muros-erro" className="field-error">
                  {errors.walls}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="luz">Iluminação observada *</label>
              <select
                id="luz"
                value={entry.lighting}
                aria-invalid={Boolean(errors.lighting)}
                aria-describedby={errors.lighting ? 'luz-erro' : undefined}
                onChange={(event) => change('lighting', event.target.value)}
              >
                <option value="">Selecione</option>
                <option>Boa</option>
                <option>Parcial</option>
                <option>Insuficiente</option>
                <option>Não observei à noite</option>
              </select>
              {errors.lighting && (
                <p id="luz-erro" className="field-error">
                  {errors.lighting}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="atividade">Fachadas com entradas ou comércio *</label>
              <select
                id="atividade"
                value={entry.activity}
                aria-invalid={Boolean(errors.activity)}
                aria-describedby={errors.activity ? 'atividade-erro' : undefined}
                onChange={(event) => change('activity', event.target.value)}
              >
                <option value="">Selecione</option>
                <option>Muitas</option>
                <option>Algumas</option>
                <option>Poucas</option>
                <option>Não sei informar</option>
              </select>
              {errors.activity && (
                <p id="atividade-erro" className="field-error">
                  {errors.activity}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="comentario">Observação adicional (opcional)</label>
              <textarea
                id="comentario"
                maxLength={300}
                rows={3}
                placeholder="Descreva apenas características do espaço"
                value={entry.comment}
                onChange={(event) => change('comment', event.target.value)}
              />
            </div>

            <button className="btn primary" type="submit">
              <ClipboardList size={18} aria-hidden="true" /> Registrar observação
            </button>

            {savedName && (
              <p className="success" role="status">
                <CheckCircle2 size={19} aria-hidden="true" />
                <span>
                  Observação de “{savedName}” registrada neste navegador. Ela aparece em Meu bairro e não é
                  enviada a um servidor.{' '}
                  <Link to="/bairro">Ver no meu bairro</Link>
                </span>
              </p>
            )}
          </form>
        </section>
        <aside className="panel side-info">
          <h2>Como funciona?</h2>
          <p>
            O registro é demonstrativo e fica salvo apenas no navegador usado. Ele não é enviado para um
            servidor nem altera os trajetos de exemplo.
          </p>
          <p>
            Descreva características observáveis. Evite afirmar que um lugar é seguro ou perigoso com base em
            uma única característica.
          </p>
          <p className="muted">* Campos obrigatórios</p>
        </aside>
      </div>
    </>
  );
}
