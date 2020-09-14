<script>
    export let title;
</script>

<style>
    .container {
        border: 1px solid lightgray;
        padding: 2rem 1rem;
        margin-bottom: 1rem;
    }
</style>

<article class="container">
    <h2>{title}</h2>

    <div>
        <slot></slot>
    </div>
</article>
