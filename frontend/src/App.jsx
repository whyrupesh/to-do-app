import React from 'react'
import TodoList from './TodoList'

export default function App() {
  return (
    <div className='bg-zinc-800 min-h-screen flex flex-col items-center p-6'>
      <h1 className='text-3xl text-white font-bold mb-4 '>To-Do-Application</h1>
      <TodoList/>
    </div>
    
  )
}
