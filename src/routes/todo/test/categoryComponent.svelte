<script lang="ts">
    import {writable} from 'svelte/store';
    import {tick} from 'svelte';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import {getTasksAPI, createTaskAPI, deleteTaskAPI, updateTaskAPI} from '$lib/scripts/todoHandler';
    import {getCategoriesAPI, deleteCategoryAPI, updateCategoryAPI} from '$lib/scripts/todoHandler';

    export let record:any;
    export let editingCategory:any;
    export let editingTask:any;
    export let getInfo:any;
    
    let inputElement:any;
    let createInput:any;
    let title:string;
    let originalTitle:string;
    let color:string = "#fff";
    let categoryID:number;
    let colorPicker:any;
    let isCreatingTask:boolean = false;

    $:isEditingCategory= record.Category.Id === editingCategory; 

    $: {
        if (isEditingCategory) {
            tick().then(() => {
                inputElement.focus();
            });
        }
    }

    $: {
        if (isCreatingTask) {
            tick().then(() => {
                createInput.focus();
            });
        }
    }

    onMount(async () => {
        categoryID = record.Category.Id;
        console.log("The category ID is: " + categoryID + " and the title is: " + record.Category.Title);
    });

    async function startEditing() {
        $editingCategory =record.Category.Id;
        originalTitle = record.Category.Title;
        title = record.Category.Title; 
        isEditingCategory=true;
    }

    async function confirmEdit() {
        await updateCategoryAPI(categoryID, title, colorPicker.value);
        $editingCategory = -2;
        isEditingCategory = false;
        await getInfo();
    }

    function cancelEdit(){
        $editingCategory = -2;
        isEditingCategory = false;
        title = originalTitle;
    }

    function startCreating(){
        isCreatingTask = true;
        
    }

    async function confirmCreate(){
        await createTaskAPI(categoryID, title);
        await getInfo();
        title = ''; 
        isCreatingTask=false;
    }


    async function handleDeleteCategoryAPI() {
        await deleteCategoryAPI(categoryID);
        await getInfo();
    }

    async function handleDeleteTaskAPI(taskID: number) {
        await deleteTaskAPI(taskID);
        await getInfo();
    }

    async function handleUpdateTaskAPI(taskID: number, title:string, completed: boolean) {
        await updateTaskAPI(taskID, title, completed);
        await getInfo();
    }


</script>

<div class="category-section">
    <div class="category">
        {#if isEditingCategory}
            <input class="" type="text" bind:value={title} bind:this={inputElement} placeholder={record.Category.Title}/>
            <input type="color" id="color-picker" bind:this={colorPicker}>
            <div class="category-actions">
                <button on:click={async () => {await confirmEdit()}}>Confirm edit</button>
                <button on:click={() => {cancelEdit()}}>Cancel edit</button>
            </div>
        {:else}
        <h1 style="align: left;">{record.Category.Title}</h1>
        {#if record.Category.Id != -1}
        <div class="category-actions">
            <button on:click={()=> {startCreating()}}>+</button>
            <button on:click={async () => {await startEditing()}}>Edit Category</button>
            <button on:click={async () => {await handleDeleteCategoryAPI()}}>Delete Category</button>
        </div>
        {:else}
        <div class="category-actions">
            <button on:click={()=> {startCreating()}}>+</button>
        </div>
        {/if}

        {/if}
    </div>
    {#each record.Tasks as task}
    <div class={`task ${task.Completed ? 'crossed-out' : ''}`}>
        <div class="task-actions">
            <input id="{task.Id}" type="checkbox" checked={task.Completed} on:change={async() => {await handleUpdateTaskAPI(task.Id, task.Title, !task.Completed)}}/>
            <p>{task.Title}</p>
        </div>
        <div class="task-actions">
            <button on:click={async () => {await handleDeleteTaskAPI(task.Id)}}>Delete</button>
        </div>
    </div>
    {/each}
    {#if isCreatingTask}

    <div class="task">
        <input type="text" bind:value={title} bind:this={createInput} placeholder="Enter to-do"/>
        <div class="task-actions">
            <button on:click={async () => {confirmCreate()}}>Create Task</button>
            <button on:click={async () => {isCreatingTask=false; title='';}}>Cancel</button>
        </div>
    </div>
    {/if}
</div>


<style>
    .header{
        margin-top:5%;
        font-size:4rem;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .anton-regular {
        font-family: "Anton", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .category-section {
        align-items: left;
        display: block;
        width:70%;
        background-color: rgba(138, 122, 160, 0.5);
        margin-bottom:2rem;
        border-radius: 15px;
        overflow: hidden;
    }

    .category{
        display: flex;
        justify-content: space-between;
        align-items: center;
        vertical-align: middle;

        background-color: #8B7AA0;
        
    }
    .category input, .category h1{
        height:3rem;
        padding:0;
        margin:0;
        margin-left:1rem; 
        vertical-align: middle;
    }

    .category input{
        font-size: 2rem;
        width:100%;
        border:0;
        background-color: transparent;
    }
    .category input:focus{
        border:0;
        background-color: transparent;
    }

    #color-picker {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 2.5rem;
        height: 2.5rem;
        background-color: transparent;
        cursor: pointer;
        border: 1px solid white;
        margin: 5px;
    }
    #color-picker::-webkit-color-swatch {
        border: 1px solid white;
        border: none;
    }
    #color-picker::-moz-color-swatch {
        border: 1px solid white;
        border: none;
    }

    .task{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        
    }

    .task *{
        height: 100%;
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        margin-left: 2rem;

    }
    .task-text{
        max-width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    .task input{
        
    }
    .task p{
        margin: 0;
        margin-left: 0.5rem;
    }
    .task-actions{
        display: inline-flex;
        z-index: 2;
        margin-right:0.3rem;
        
    }


    .category-actions{
        display: inline-flex;
        margin-right:1rem;
    }

    .categories-container{
        word-wrap: normal;
    }

    .crossed-out{
        color: #523875; /* Change this to the color you want */
        background-color: rgba(0, 0, 0, 0.13);

    }
    .crossed-out::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 100%;
        
        border: 1px solid #523875; /* Change the color as needed */
        
    }

    input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    }

    input[type="checkbox"] {
        appearance: none;
        background-color: #fff;
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid currentColor;
        border-radius: 0.15em;
        transform: translateY(-0.075em);

        display: grid;
        place-content: center;
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em darkorchid;
        background-color: CanvasText;

        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

</style>