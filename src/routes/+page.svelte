<script>
    import { json } from "@sveltejs/kit";
    import { browser } from "$app/environment";
	import { onMount } from 'svelte';
    import {getToken} from '$lib/scripts/requestHandler'
    import Navbar from './navbar.svelte';

    $:username = 'Loading..';
  

    
    async function ButtonClick()
    {
        const response = await fetch('https://overtaskapi.me/account/getUsername', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        
        if(response.ok)
        {
            const data = await response.json();
            username = data.username;
        }
        else
        {
            username = "Unknown user";
        }


        console.log(username);
        
       
    }

    async function LogOut()
    {
        console.log('Logging out');
        const response = await fetch('https://overtaskapi.me/authenticate/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        if(response.ok)
        {
            console.log('Logged out');
        }
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        username = 'Unknown User';
    }
    
    onMount(async () => {
        await ButtonClick();
    });


    async function getTasks(){
        console.log("getting tasks")
        const response = await fetch(`https://overtaskapi.me/todo/get`, {
            method:"GET",
            headers:{
                'Authorization': `Bearer ${await getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            const data = await response.json();
            console.log("we dun it");
            console.log(data);
        }
    }
</script>
<Navbar />
<h1>Welcome to SvelteKit, {username}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={ButtonClick}>
    Click me
</button>

<button on:click={LogOut}>
    Log out
</button>

<button on:click={getTasks}>
    Get tasks
</button>

<div class="rectangle"></div>

<style>

</style>