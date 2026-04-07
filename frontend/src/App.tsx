import { useState } from 'react'
import Quiz from './pages/Quiz'

// TODO: substituir pelo usuário autenticado (AuthContext) na task 1.1
const USUARIO_ID_TEMP = 1

export default function App() {
  const [refazendo, setRefazendo] = useState(false)

  return (
    <Quiz
      usuarioId={USUARIO_ID_TEMP}
      refazendo={refazendo}
      onConcluido={() => {
        // TODO: navegar para /destinos após integrar React Router (task 1.3)
        setRefazendo(false)
      }}
    />
  )
}
