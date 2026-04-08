export interface Opcao {
  label: string;
  tag: string;
}

export interface Pergunta {
  id: number;
  texto: string;
  opcoes: Opcao[];
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  quizCompleto: boolean;
}

export interface Destino {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  tags: string[];
  percentualMatch?: number;
}
