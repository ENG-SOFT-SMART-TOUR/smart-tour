export interface Pergunta {
  id: number
  texto: string
  opcoes: { label: string; tag: string }[]
}

export interface Usuario {
  id: number
  nome: string
  email: string
  quizCompleto: boolean
}

export interface Destino {
  id: number
  nome: string
  descricao: string
  foto: string
  categoria: string
  tags: string[]
  percentualMatch?: number
}