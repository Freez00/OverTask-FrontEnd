<script lang="ts">
    import Navbar from '../../navbar.svelte';
    import {getTasksAPI, createTaskAPI, deleteTaskAPI, updateTaskAPI} from '$lib/scripts/todoHandler';
    import {getCategoriesAPI, deleteCategoryAPI, createCategoryAPI} from '$lib/scripts/todoHandler';
    import type {Task, Category} from '$lib/scripts/todoHandler';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import CategoryComponent from './categoryComponent.svelte';
    import {tick} from 'svelte';

    let info: any = [];
    let categories:Category[] = [];
    let isCreatingCategory:boolean = false;
    let createCategoryTitle:string = '';
    let categoryTitleInput:any;
    let colorPicker:any;

    let editingCategory = writable(-2);
    let editingTask = writable(-2);

    $: {
        if (isCreatingCategory) {
            tick().then(() => {
                categoryTitleInput.focus();
            });
        }
    }


    onMount(async () => {
        await getInfo();
    })

    async function getInfo(){
        info = [];
        let data = await getTasksAPI();
        info = data;
        console.log(info);

        categories = await getCategoriesAPI();
    }

    async function handleCreateCategory(){
        isCreatingCategory = false;
        await createCategoryAPI(createCategoryTitle, colorPicker.value);
        await getInfo();
    }

</script> 

<Navbar/>

<div class="main">

    <h1 class="header anton-regular">Tasks</h1>
    <button on:click={() => {isCreatingCategory = true}}>Create Category</button>
    
    {#each info as record}
    <CategoryComponent 
        record={record} 
        bind:editingCategory={editingCategory} 
        editingTask={editingTask} 
        getInfo={getInfo}
    />
    {/each}

    {#if isCreatingCategory}
    <div class="category-section">
        <div class="category">
            <input class="" type="text" bind:value={createCategoryTitle} bind:this={categoryTitleInput} placeholder="Category name"/>
            <input type="color" id="color-picker" bind:this={colorPicker}>
            <div class="category-actions">
                <button on:click={async () => {await handleCreateCategory()}}>Create Category</button>
                <button on:click={() => {isCreatingCategory = false; createCategoryTitle = ''}}>Cancel</button>
            </div>
        </div>
    </div>
    {/if}
    
</div>



<style>
    .main{
        font-family: "Anton", sans-serif;
        font-weight: 400;
        font-style: normal;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


    }
    .main *{
        word-wrap: break-word;
    }

    .header{
        margin-top:1rem;
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
    }

    .category{
        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: #8B7AA0;
    }

    .category-actions{
        display: inline-block;
    }
    .category{
        display: flex;
        justify-content: space-between;
        align-items: center;
        vertical-align: middle;
        width: 100%;

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