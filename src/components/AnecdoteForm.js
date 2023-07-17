
import { useQuery } from 'react-query'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

const url = 'http://localhost:3001/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  function getId() {
    return Math.floor(Math.random() * 100000) + 1;
  }

  const submit = useMutation(
    (data) => axios.post(url, { content: data, id: getId(), votes: 0 }).then((res) => { return res.data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
    }
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    submit.mutate(content)
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
