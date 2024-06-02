import { useEffect, useRef, useState } from 'react';
import { customAxios } from '../axios/axios';
import { BsPencilSquare, BsFillTrash3Fill } from 'react-icons/bs';
import { InputField, Typography } from './components';
import { RxCross2 } from 'react-icons/rx';

function App() {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [errors, setErrors] = useState({});

  async function getTodos() {
    const { data, success } = await customAxios.get('todo/');
    success && setTodos(data);
  }

  async function createTodo(event) {
    event.preventDefault();
    const payload = { todo: inputValue };
    let method, queryId;
    if (selectedTodo) {
      payload.id = selectedTodo;
      method = 'put';
      queryId = selectedTodo + '/';
    } else {
      method = 'post';
      queryId = '';
    }
    const { success, errors } = await customAxios[method](
      `todo/${queryId}`,
      payload
    );
    if (success) {
      refetchTodos();
      setInputValue('');
    } else {
      setErrors(errors);
    }
  }

  function refetchTodos() {
    getTodos();
    setSelectedTodo(null);
  }

  function handleEditClick(todo) {
    setSelectedTodo(todo.id);
    setInputValue(todo.todo);
  }

  function clearInput() {
    setInputValue('');
    setSelectedTodo(null);
    setErrors({});
    handleFocus();
  }

  function handleInputChange(value) {
    setInputValue(value);
    setErrors({});
  }

  function handleFocus() {
    inputRef.current.focus();
  }

  async function handleDeleteClick(id) {
    const { success } = await customAxios.delete(`todo/${id}/`);
    if (success) {
      refetchTodos();
      selectedTodo === id && setInputValue('');
      handleFocus();
    }
  }

  useEffect(() => {
    if (selectedTodo) {
      setInputValue(selectedTodo.todo);
      handleFocus();
    }
  }, [selectedTodo]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="min-w-screen min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="w-4/5 md:w-3/4 max-w-[1192px] h-[90vh] md:h-[80vh] bg-gray-900 rounded-md flex flex-col gap-8 max-sm:px-4 p-8">
        <Typography variant="title">Todo list</Typography>
        <form onSubmit={createTodo}>
          <div className="w-full relative flex items-center">
            <InputField
              ref={inputRef}
              placeholder="Enter something"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus={true || selectedTodo}
              className="focus:bg-white/20"
              error={errors?.todo}
            />
            <button
              type="button"
              className="absolute right-0 p-3 cursor-pointer"
              onClick={clearInput}
            >
              <RxCross2 className="text-white" />
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 text-white text-xs md:text-sm">
          {todos.map((todo) => {
            return (
              <div
                key={todo?.id}
                className="bg-transparent/10 px-4 py-2 rounded-sm md:rounded-md flex justify-between items-center"
              >
                <span>{todo.todo}</span>
                <div className="flex gap-2 md:gap-4">
                  <button
                    className="cursor-pointer outline-none rounded-sm p-1 focus:bg-white/20"
                    onClick={() => handleEditClick(todo)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="cursor-pointer outline-none rounded-sm p-1 focus:bg-white/20"
                    onClick={() => handleDeleteClick(todo.id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
