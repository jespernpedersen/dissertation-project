<template>
    <article>
        <figure class="wave"></figure>
        <span class="title wave"></span>
        <span class="description wave"></span>
    </article>
</template>

<script>

export default {
    name: "DishPlaceholder"
}
</script>

<style scoped>
    article{
        height: 300px;
        width: 80vw;
        background-color: #f6f5f1;
        border-radius: 12px;
        overflow: hidden;
        margin: 0 15px 20px 15px;
    }

    article figure{
        height: 186px;
    }

    article span.title {
        height: 20px;
        display: block;
        margin: 15px;
        margin-bottom: 10px;
        width: 150px;

    }

    article span.description {
        height: 16px;
        display: block;
        margin: 15px;
        margin-top: 10px;
        width: 200px;
    }

    .wave{
        background: rgb(237,237,237);
        background: linear-gradient(-45deg, rgba(237,237,237,1) 25%, rgba(244,244,244,1) 50%, rgba(237,237,237,1) 75%);
        animation-name: wave;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        background-size: 400%;
    }

    @keyframes wave {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: -150% 50%;
    }
    100% {
        background-position: -150% 50%;
    }
}
</style>