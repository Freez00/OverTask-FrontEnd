<script lang='ts'>
    interface Todo {
        id: number;
        text: string;
    }

    let todos: Todo[] = [];
    let newTodo = '';

    function addTodo() {
        if (newTodo.trim() !== '') {
            const todo: Todo = {
                id: todos.length + 1,
                text: newTodo
            };
            todos = [...todos, todo];
            newTodo = '';
        }
    }

    function removeTodo(id: number) {
        todos = todos.filter(todo => todo.id !== id);
    }
</script>

<h1>Todo List</h1>

<!-- Display todos -->
<ul>
    {#each todos as todo}
        <li>
            {todo.text}
            <button on:click={() => removeTodo(todo.id)}>Remove</button>
        </li>
    {/each}
</ul>

<!-- Create new todo -->
<input type="text" bind:value={newTodo} placeholder="Enter a new todo" />
<button on:click={addTodo}>Add Todo</button>