import { useState, useEffect } from 'react'
import type { Pergunta } from '../types'
import { quizApi } from '../services/api'
import './Quiz.css'

const PERGUNTAS_FALLBACK: Pergunta[] = [
  {
    id: 1,
    texto: 'Qual tipo de destino mais te atrai?',
    opcoes: [
      { label: 'Praia', tag: 'praia' },
      { label: 'Montanha', tag: 'montanha' },
      { label: 'Cidade histórica', tag: 'historia' },
      { label: 'Campo / Interior', tag: 'campo' },
      { label: 'Natureza selvagem', tag: 'natureza' },
    ],
  },
  {
    id: 2,
    texto: 'Como você prefere aproveitar a viagem?',
    opcoes: [
      { label: 'Aventura e adrenalina', tag: 'aventura' },
      { label: 'Descanso e relaxamento', tag: 'relaxamento' },
      { label: 'Cultura e aprendizado', tag: 'cultural' },
      { label: 'Gastronomia', tag: 'gastronomia' },
      { label: 'Ecoturismo', tag: 'ecologia' },
    ],
  },
  {
    id: 3,
    texto: 'Com quem você costuma viajar?',
    opcoes: [
      { label: 'Sozinho(a)', tag: 'solo' },
      { label: 'Com meu par', tag: 'romantico' },
      { label: 'Com a família', tag: 'familia' },
      { label: 'Com amigos', tag: 'amigos' },
      { label: 'Em grupo / excursão', tag: 'grupo' },
    ],
  },
  {
    id: 4,
    texto: 'Qual é o seu orçamento para a viagem?',
    opcoes: [
      { label: 'Econômico', tag: 'economico' },
      { label: 'Moderado', tag: 'moderado' },
      { label: 'Confortável', tag: 'confortavel' },
      { label: 'Luxo', tag: 'luxo' },
    ],
  },
  {
    id: 5,
    texto: 'Quanto tempo você tem disponível?',
    opcoes: [
      { label: 'Fim de semana (até 3 dias)', tag: 'curto' },
      { label: 'Uma semana', tag: 'medio' },
      { label: 'Duas semanas', tag: 'longo' },
      { label: 'Mais de duas semanas', tag: 'extendido' },
    ],
  },
]

interface QuizProps {
  usuarioId: number
  onConcluido?: () => void
}

export default function Quiz({ usuarioId, onConcluido }: QuizProps) {
  const [perguntas, setPerguntas] = useState<Pergunta[]>(PERGUNTAS_FALLBACK)
  const [passo, setPasso] = useState(0)
  const [respostas, setRespostas] = useState<Record<number, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    quizApi.getPerguntas()
      .then(setPerguntas)
      .catch(() => { /* usa fallback */ })
  }, [])

  const perguntaAtual = perguntas[passo]
  const total = perguntas.length
  const respostaSelecionada = respostas[perguntaAtual.id]
  const ehUltimo = passo === total - 1

  function selecionar(tag: string) {
    setRespostas(prev => ({ ...prev, [perguntaAtual.id]: tag }))
  }

  function avancar() {
    if (!ehUltimo) {
      setPasso(p => p + 1)
      return
    }
    const tags = perguntas.map(p => respostas[p.id]).filter(Boolean)
    enviarPerfil(tags)
  }

  async function enviarPerfil(tags: string[]) {
    setEnviando(true)
    setErro(null)
    try {
      await quizApi.responder(usuarioId, tags)
      onConcluido?.()
    } catch {
      setErro('Não foi possível salvar seu perfil. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz de Estilo de Viagem</h1>

      <div className="stepper">
        {perguntas.map((_, i) => (
          <div
            key={i}
            className={`stepper-dot ${i < passo ? 'done' : ''} ${i === passo ? 'active' : ''}`}
          />
        ))}
      </div>

      <p className="quiz-progresso">
        Pergunta {passo + 1} de {total}
      </p>

      <div className="quiz-card">
        <h2 className="quiz-pergunta">{perguntaAtual.texto}</h2>

        <ul className="quiz-opcoes">
          {perguntaAtual.opcoes.map(opcao => (
            <li key={opcao.tag}>
              <button
                className={`opcao-btn ${respostaSelecionada === opcao.tag ? 'selecionada' : ''}`}
                onClick={() => selecionar(opcao.tag)}
                disabled={enviando}
              >
                {opcao.label}
              </button>
            </li>
          ))}
        </ul>

        {erro && <p className="quiz-erro">{erro}</p>}
      </div>

      <div className="quiz-nav">
        <button
          className="nav-btn voltar"
          onClick={() => setPasso(p => p - 1)}
          disabled={passo === 0 || enviando}
        >
          Voltar
        </button>

        <button
          className="nav-btn avancar"
          onClick={avancar}
          disabled={!respostaSelecionada || enviando}
        >
          {enviando ? 'Salvando...' : ehUltimo ? 'Ver destinos' : 'Próxima'}
        </button>
      </div>
    </div>
  )
}
