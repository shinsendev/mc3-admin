<script>
    import {Textfield, Button} from 'svelte-mui/src';
    import {connected, token, error} from "../store.js";
    import { onMount } from 'svelte';

    let login = '';
    let password = '';
    let mc3Url = 'http://127.0.0.1:8000/';
    // let mc3Url = 'http://api.mc2.website/';
    let result = null;

    async function postLogin() {
        const response = await fetch(mc3Url+'authentication_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "email": login,
                "password": password,
            })
        }).catch((err) => {
            error.set(err)
        });

        const json = await response.json();

        if (json.token !== undefined) {
            token.set(json.token);
            connected.set(true);
        }

        else if (json.code === 401) {
            error.set('Uncorrect login or/and password.');
        }

        else if (json.code === 500) {
            error.set('Error with MC3 server.')
        }

        else {
            error.set('An unexpected error has occured. Error message is :' + json.message);
        }

        result = JSON.stringify(json)
    }

</script>

<style>
    .textfields-wrapper {
        max-width: 500px;
        margin: auto;
        padding-bottom: 1rem;
    }

    .submit-wrapper {
        display: flex;
        justify-content: center;
    }

    .error {
        color: red;
        text-align: center;
    }

</style>

<div class="login-wrapper">

    <div class="textfields-wrapper">
        <Textfield
                autocomplete="off"
                label="name"
                required
                message="write your login"
                class="login-input login-input-name"
                bind:value={login}
        />

        <Textfield
                autocomplete="off"
                label="password"
                required
                message="write your password"
                class="login-input login-input-password"
                type="password"
                bind:value={password}
        />
    </div>

    <div class="submit-wrapper">
        <Button class="submit" on:click={postLogin} outlined color='#db5462'>Submit</Button>
    </div>


    {#if $error !== null}
    <div class="error">
        <p>{$error}</p>
    </div>
    {/if}

</div>