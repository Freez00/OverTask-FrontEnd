<script lang="ts">
    import { json } from "@sveltejs/kit";
    import { browser } from "$app/environment";
	import { onMount } from 'svelte';
    import {getToken} from '$lib/scripts/requestHandler'
    import Navbar from './navbar.svelte';
    import {backendURL} from '$lib/scripts/variables'
    import {localTaskInformation} from '$lib/scripts/localTasksPrst'

    $:username = '--(waiting for connection to server)--';
    
    async function ButtonClick()
    {
        const response = await fetch(`${backendURL}/account/getUsername`, {
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
        const response = await fetch(`${backendURL}/authenticate/logout`, {
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


</script>
<Navbar />
<div>
    
    <h1>Welcome to Overtask, {username}</h1>
    <p>Todo & Calendar rabotqt na online i offline mode. Kogato ste vleznali v accounta si rabotqt sus bazata danni i zapazvat tam. Ako ne ste avtentikirani informaciqta se vzima i zapazva lokalno.</p>
    <p>Za grupite e zaduljitelno da ste vlezli v profila si i da imate internet.</p>    
    
</div>
    <style>
        
</style>