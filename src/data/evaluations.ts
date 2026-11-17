export type Evaluation = {
  name: string;
  walls: string;
  lighting: string;
  activity: string;
  comment: string;
  createdAt: string;
};

const STORAGE_KEY = 'ruas-vivas-avaliacoes';

function isEvaluation(value: unknown): value is Evaluation {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.name === 'string' &&
    typeof item.walls === 'string' &&
    typeof item.lighting === 'string' &&
    typeof item.activity === 'string' &&
    typeof item.comment === 'string' &&
    typeof item.createdAt === 'string'
  );
}

export function loadEvaluations(): Evaluation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEvaluation);
  } catch {
    return [];
  }
}

export function saveEvaluation(entry: Omit<Evaluation, 'createdAt'>): boolean {
  try {
    const saved: Evaluation = { ...entry, createdAt: new Date().toISOString() };
    const next = [...loadEvaluations(), saved];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch {
    return false;
  }
}
