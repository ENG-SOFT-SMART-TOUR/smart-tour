const BASE_URL = 'http://localhost:8080'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`)
  }
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T
  }
  return response.json()
}

export const quizApi = {
  getPerguntas: () => request<import('../types').Pergunta[]>('/quiz/perguntas'),

  responder: (usuarioId: number, tags: string[]) =>
    request<void>('/quiz/responder', {
      method: 'POST',
      body: JSON.stringify({ usuarioId, tags }),
    }),
}
