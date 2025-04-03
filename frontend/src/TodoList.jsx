import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSquare, faPenToSquare, faTrash, faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [page, setPage] = useState(0);
    const [totalToDo, setTotalToDo] = useState(0);

    useEffect(() => {
        fetchTodos();
    }, [page]);

    useEffect(() => {
        fetchAllToDos();
    }, []);

    const fetchAllToDos = async () => {
        try {
            const res = await fetch("https://to-do-app-i8nj.onrender.com/todos");
            const data = await res.json();
            setTotalToDo(data.length);
        } catch (err) {
            console.error("Error in fetching", err);
        }
    };

    const fetchTodos = async () => {
        try {
            const res = await fetch(`https://to-do-app-i8nj.onrender.com/todos?_start=${page * 5}&_limit=5`);
            const data = await res.json();
            setTodos(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching todos:", err);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            await fetch("https://to-do-app-i8nj.onrender.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ todo: newTodo, completed: false })
            });
            setNewTodo("");
            fetchTodos();
            fetchAllToDos();
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            await fetch(`https://to-do-app-i8nj.onrender.com/todos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !completed })
            });
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`https://to-do-app-i8nj.onrender.com/todos/${id}`, { method: "DELETE" });
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    const startEditing = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = async (id) => {
        if (!editText.trim()) return;
        try {
            await fetch(`https://to-do-app-i8nj.onrender.com/todos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ todo: editText })
            });
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, todo: editText } : todo));
            setEditingId(null);
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 text-white">
            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-grow px-3 py-2 rounded-lg text-white border border-gray-300"
                    placeholder="Add a new todo..."
                />
                <button onClick={addTodo} className="p-2 bg-green-500 rounded-lg hover:bg-green-600">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-3">
                    {todos.map((todo) => (
                        <div key={todo.id} className="relative border border-white rounded-xl p-3 flex items-center gap-2 h-14">
                            <button onClick={() => toggleComplete(todo.id, todo.completed)}>
                                {todo.completed ?
                                    (<FontAwesomeIcon icon={faCheck} className="text-green-400" />) :
                                    (<FontAwesomeIcon icon={faSquare} className="hover:text-green-500" />)
                                }
                            </button>

                            {editingId === todo.id ? (
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="flex-grow px-2 py-1 text-white rounded-lg border border-gray-300"
                                />
                            ) : (
                                <div className={`flex-grow truncate ${todo.completed ? "line-through text-gray-400" : ""}`}>
                                    {todo.todo}
                                </div>
                            )}

                            <div className="absolute right-3 flex gap-2">
                                {editingId === todo.id ? (
                                    <button onClick={() => saveEdit(todo.id)} className="text-blue-500 hover:text-blue-600">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => startEditing(todo.id, todo.todo)} className="text-yellow-400 hover:text-yellow-500">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                )}
                                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded-lg ${page === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> Prev
                </button>

                <span>Page {page + 1} of {Math.ceil(totalToDo / 5)}</span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= Math.ceil(totalToDo / 5) - 1}
                    className={`px-4 py-2 rounded-lg ${page >= Math.ceil(totalToDo / 5) - 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}
