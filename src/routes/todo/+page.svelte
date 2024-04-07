<script lang='ts'>
    import Navbar from '../navbar.svelte';
    import {getTasksAPI, createTaskAPI, deleteTaskAPI, updateTaskAPI} from '$lib/scripts/todoHandler';
    import {getCategoriesAPI, deleteCategoryAPI} from '$lib/scripts/todoHandler';
    import type {Task, Category} from '$lib/scripts/todoHandler';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let title:string = '';
    let info: any = [];
    let categoryID: number = -1;
    let categories:Category[] = [];


    onMount(async () => {
        let data = await getTasksAPI();
        info = data;

        categories = await getCategoriesAPI();
    })

    async function handleGetTasksAPI() {
        info = await getTasksAPI();
    }

    async function handleCreateTaskAPI(categoryID: number) {
        let data = await createTaskAPI(categoryID, title);
        console.log(data)
        handleGetTasksAPI();
        title = '';
    }

    async function handleUpdateTaskAPI(taskID: number, title:string, completed: boolean) {
        let data = await updateTaskAPI(taskID, title, completed);
        console.log(data)
        handleGetTasksAPI();
    }

    async function handleDeleteTaskAPI(taskID: number) {
        let data = await deleteTaskAPI(taskID);
        console.log(data)
        handleGetTasksAPI();
    }
</script>
<Navbar/>

<h3 style="text-decoration:underline;" on:click={async () => {await goto("todo/test")}}>(debug) GO TO TEST PAGE</h3>
<hr>

<!-- Create new todo -->
<button on:click={handleGetTasksAPI}>Get Tasks</button>

<select name="catSelect" id="catSelect" bind:value={categoryID}>
    {#each categories as category}
        <option value={category.Id}>{category.Title}</option>
    {/each}
</select>
<input type="text" bind:value={title} placeholder="Enter to-do"/>
<button on:click={async () => {await handleCreateTaskAPI(categoryID); await handleGetTasksAPI(); console.log(categoryID)}}>Create Task</button>


<h1>Tasks</h1>
<br>
{#each info as record}
    <div>
        <h1>{record.Category.Title}</h1>
        {#if record.Category.Id != -1}
            <button on:click={async () => {await deleteCategoryAPI(record.Category.Id);}}>Delete Category</button>
        {/if}
        {#each record.Tasks as task}
        <div>
            <p>{task.Title}</p>
            <input id="{task.Id}" type="checkbox" checked={task.Completed} on:change={async() => {await handleUpdateTaskAPI(task.Id, task.Title, !task.Completed)}}/>
                <button on:click={async () => {await handleDeleteTaskAPI(task.Id);}}>Delete</button>
            </div>
        {/each}
    </div>
{/each}
