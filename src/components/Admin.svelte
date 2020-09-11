<script>
    import Section from "../components/Section.svelte";
    import { Button } from 'svelte-mui/src';
    import { token } from "../store.js";

    let result = null
    let mc3Url = 'http://127.0.0.1:8000/';

    async function post(urlSuffix) {
        const response = await fetch(mc3Url + urlSuffix, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'Authorization': 'Bearer '+ $token,
            },
            body: JSON.stringify({})
        });

        const json = await response.json()
        result = JSON.stringify(json)
    }

</script>

<Section title="Last Migration">
    <ul>
        <li>Status : <strong>in progress</strong></li>
        <li>Type: indexation</li>
        <li>Has Started at : </li>
    </ul>

    <p>If migration is not finished, you have to wait (x time) before being able to launch a new one.</p>
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


