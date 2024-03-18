<script lang='ts'>
    import {createGroup} from '$lib/scripts/groupHandler'
    import {joinGroup} from '$lib/scripts/groupHandler'
    import type {Group} from '$lib/scripts/groupHandler'
    import {getGroups} from '$lib/scripts/groupHandler'
    import {deleteGroup} from '$lib/scripts/groupHandler'
    import {leaveGroup} from '$lib/scripts/groupHandler'
    import {onMount} from 'svelte'
    import {getUserId} from '$lib/scripts/requestHandler'
    import Navbar from '../navbar.svelte';


    let groupName = '';
    let joinCode_create = '';
    let joinCode_join = '';
    let groups:Group[] = [];
    let userID:number;

    onMount(async ()=>{
        await fetchGroups();
        userID = await getUserId();
        console.log("userID is " + userID)
    });

    async function createSubmit() {
        await createGroup(groupName, joinCode_create);
        groupName = '';
        joinCode_create = '';
        await fetchGroups();
    }

    async function joinSubmit(){
        await joinGroup(joinCode_join);
        joinCode_join = '';
        await fetchGroups();
    }

    async function fetchGroups(){
        groups = await getGroups();

    }

    async function _leaveGroup(groupID:number) {
        await leaveGroup(groupID);
        await fetchGroups();
    }

    async function _deleteGroup(groupID:number){
        await deleteGroup(groupID);
        await fetchGroups();
    }
</script>

<Navbar></Navbar>
<h1>Create group</h1>
<form on:submit|preventDefault={createSubmit}>
    <label>
        Group Name:
        <input type="text" bind:value={groupName} />
    </label>
    <label>
        Join Code:
        <input type="text" bind:value={joinCode_create} />
    </label>
    <button type="submit">Create Group</button>
</form>

<h1>Join Group</h1>
<form on:submit|preventDefault={joinSubmit}>
    <label>
        Join Code:
        <input type="text" bind:value={joinCode_join} />
    </label>
    <button type="submit">Create Group</button>
</form>
<h1>GROUPSSSSSSSSSSSSS</h1>

{#each groups as group}
    <h1>
        {group.Id}
        {group.Name}
    </h1>
    <h3>
        {group.OwnerID}
    </h3>
    <button on:click={async () => await _leaveGroup(group.Id)}>Leave Group</button>
    {#if group.OwnerID == userID}
        <button on:click={async () => await _deleteGroup(group.Id)}>Delete Group</button>
    {/if}
    <hr>
{/each}