import Quiz from './pages/Quiz'

function App() {
  function handleQuizSubmit(tags: string[]) {
    console.log('Tags selecionadas:', tags)
    // TODO: integrar com POST /quiz/responder
  }

  return <Quiz onSubmit={handleQuizSubmit} />
}

export default App
