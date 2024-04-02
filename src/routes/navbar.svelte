<script lang="ts">
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';

    let isMobile = false;

    onMount(() => {
        // Check if the device is mobile
        isMobile = window.innerWidth <= 768;
    });

    function toggleMobileMenu() {
        isMobile = !isMobile;
    }

    function navigateTo(path:string) {
        window.location.href = path;
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
    <a class="navbar-brand" href="/">OverTask</a>
    <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        on:click={toggleMobileMenu}
    >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div
        class="collapse navbar-collapse"
        id="navbarNav"
        class:show="{isMobile}"
    >
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="../authentication" >Authenticate</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../calendar/" on:click|preventDefault={() => navigateTo('../calendar/')}>Calendar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../groups">Groups</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../todo">Todo</a>
            </li>
        </ul>
    </div>
</nav>

<style>
    .show {
        display: block !important;
    }
    .navbar-custom{
        background-color: #8864b5 !important;
    }
</style>