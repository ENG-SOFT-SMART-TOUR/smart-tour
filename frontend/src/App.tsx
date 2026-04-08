import Quiz from './pages/Quiz'

// TODO: substituir pelo id do usuário autenticado (AuthContext) na task 1.1
const USUARIO_ID_TEMP = 1

function App() {
  function handleQuizConcluido() {
    // TODO: navegar para /destinos após integrar React Router (task 1.3)
    console.log('Quiz concluído — redirecionar para destinos')
  }

  return <Quiz usuarioId={USUARIO_ID_TEMP} onConcluido={handleQuizConcluido} />
}

export default App
