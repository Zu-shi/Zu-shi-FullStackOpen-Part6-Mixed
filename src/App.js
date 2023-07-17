import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const App = () => {

  const { isLoading, isError, data, error } = useQuery(
    'anecdotes', () => axios.get(url).then(res => res.data)
  )

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if (isLoading) {
    return <div>Anecdotes are being fetched</div>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
