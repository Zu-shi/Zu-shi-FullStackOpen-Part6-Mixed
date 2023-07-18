
import { useQuery } from 'react-query'
import axios from 'axios'
import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { NotificationContext } from './NotificationContext'

const url = 'http://localhost:3001/anecdotes'

const AnecdoteForm = () => {
  const [notif, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  function getId() {
    return Math.floor(Math.random() * 100000) + 1;
  }

  const submit = useMutation(
    (data) => axios.post(url, { content: data, id: getId(), votes: 0 }).then((res) => { return res.data }),
    {
      onSuccess: (newAnecdote) => {
        //queryClient.invalidateQueries('anecdotes')
        const ans = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', ans.concat(newAnecdote))
      },
      onError: (error) => {
        dispatch({ type: 'SET', payload: error.response.data.error })
        setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000);
      }
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
