<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import {spring} from 'svelte/motion';
    import Navbar from '../navbar.svelte';

    let isRegister = false;
    let email = '';
    let username = '';
    let password = '';
    let confirmPassword = '';

    function handleSubmit() {
        if (isRegister) {
            // Handle register functionality
            console.log('Register:', email, username, password, confirmPassword);
        } else {
            // Handle login functionality
            console.log('Login:', email, password);
        }
    }

    onMount(() => {
        // Add any additional initialization logic here
    });

    function slide(node: HTMLElement, { delay = 0, duration = 400 }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);

        return {
            delay,
            duration,
            css: (t: number) => `
                opacity: ${t * opacity};
                height: ${t * height}px;
                padding-top: ${t * padding_top}px;
                padding-bottom: ${t * padding_bottom}px;
                margin-top: ${t * margin_top}px;
                margin-bottom: ${t * margin_bottom}px;
                border-top-width: ${t * border_top_width}px;
                border-bottom-width: ${t * border_bottom_width}px;
            `
        };
    }
</script>

<div class="all">

    <Navbar />
    <main>
        <div class="container mx-auto">
            <div class="title-container">
                <h1 class="title" class:active={!isRegister} on:click={() => isRegister = false}>Login</h1>
                <h1 class="title" class:active={isRegister} on:click={() => isRegister = true}>Register</h1>
            </div>
            <form on:submit|preventDefault={handleSubmit}>
                {#if isRegister}
                <div class="mb-3" transition:slide={{}}>
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" bind:value={username} required />
                </div>
                {/if}
                <div class="mb-3" transition:slide={{}}>
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" bind:value={email} required />
                </div>
                <div class="mb-3" transition:slide={{}}>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" bind:value={password} required />
                </div>
                {#if isRegister}
                <div class="mb-3" transition:slide={{}}>
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" bind:value={confirmPassword} required />
                </div>
                {/if}
                <button type="submit" class="btn btn-primary" transition:scale>{isRegister ? 'Register' : 'Login'}</button>
            </form>
        </div>
</main>
</div>

<style>
    body, html, main{
        height:90%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .all{
        height:100vh;
    }
    
    .container {
        max-width: 400px; /* This might not be necessary if you're using a Bootstrap container */
    margin: auto auto;
    padding: 20px;
    background-color: #373c4f;
    border-radius: 20px;
    /*height:524px;*/
}

.title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

    .title {
        text-align: center;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;
        color:#b0abcf;
    }

    .title.active {
        color: rgb(151, 151, 255);
        font-size: 30px;
    }

    .form-label {
        font-weight: bold;
        color:#fff;
    }

    .form-control {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #b0abcf;
        border-radius: 7px;
    }

    .btn {
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #007bff;
        color: #fff;
        border: none;
    }
</style>