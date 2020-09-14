<script>
    import Section from "../components/Section.svelte";
    import { Button } from 'svelte-mui/src';
    import {token, migration, postError, mc3, error, connected, success} from "../store.js";
    import { onMount } from 'svelte';

    let result = null
    let lastImport = null;
    let lastIndexation = null;

    async function post(urlSuffix) {
        const response = await fetch($mc3 + urlSuffix, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer '+ $token,
            },
            body: JSON.stringify({})
        }).catch((err) => {
            postError.set(err);
        });

        const json = await response.json();

        if (json['@type'] === 'hydra:Error') {
            success.set(null);
            postError.set(json['@type'] + ': ' + json['hydra:description']);
        }
        else {
            postError.set(null);
            success.set('Migration has been successfully launched!');
        }

        result = JSON.stringify(json)

    }

    async function get(urlSuffix) {
        const response = await fetch($mc3 + urlSuffix, {
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer '+ $token,
            },
        });

        return await response.json();
    }

    function getLastMigration(imports, indexations) {
        if (imports.length === 0 && indexations.length === 0) {
            return null;
        }

        lastImport = imports[0];
        lastIndexation = indexations[0];

        if (lastImport.createdAt > lastIndexation.createdAt) {
            lastImport.type = 'migration';
            return lastImport;
        }
        else {
            lastIndexation.type = 'indexation';
            return lastIndexation;
        }
    }

    onMount(async () => {
        const imports = await get('api/imports.json');
        const indexations = await get('api/indexations.json');
        migration.set(getLastMigration(imports, indexations));
    });

</script>

<style>
    .error {
        color: red;
        text-align: center;
    }

    .success {
        color: green;
        text-align: center;
    }
</style>

<Section title="Last Migration">

    {#if $migration !== null}
    <ul>
        <li>Status : <strong>{$migration.status}</strong></li>
        <li>Type: {$migration.type}</li>
        <li>Started at : {$migration.createdAt}</li>
    </ul>
    {:else}
        <p>No data</p>
    {/if}

    <p>If migration is not finished, you have to wait 45 minutes before being able to launch a new one.</p>
    <p>If migrations always failed, contact mc2(at)shinsen(dot)fr.</p>

</Section>

<Section title="Website update">
    <div>
        <ul>
            <li>Synchronize data with last mc2.sql dump</li>
        </ul>
    </div>

    <Button class="submit" on:click={() =>  {post('api/imports')}} outlined color='#db5462'>Start Import</Button>

</Section>

<Section title="Indexation">
    <div>
        <ul>
            <li>Recompute stats for people and attributes dataviz</li>
            <li>Update algolia data</li>
            <li>Update Elastic Search and Kibana index</li>
            <li>Rebuild website with new data</li>
        </ul>
    </div>

    <Button class="submit" on:click={() =>  {post('api/indexations')}} outlined color='#db5462'>Start Indexation</Button>

</Section>

<section>
    {#if $success !== null}
        <div class="success">
            <p>{$success}</p>
        </div>
    {/if}
    {#if $postError !== null}
        <div class="error">
            <p>{$postError}</p>
        </div>
    {/if}
</section>

