<template>
    <ul class="loading">
        <li class="wave"></li>
        <li class="wave"></li>
        <li class="wave"></li>
        <li class="wave"></li>
    </ul>
</template>

<script>
export default {
    name: "AccordionPlaceholder"
}
</script>

<style scoped>

.wave::before, .wave::after{
    background: rgb(237,237,237);
    background: linear-gradient(-45deg, rgba(237,237,237,1) 25%, rgba(244,244,244,1) 50%, rgba(237,237,237,1) 75%);
    animation-name: wave;
    animation-iteration-count: infinite;
    animation-duration: 2s;
    background-size: 400%;
}

ul.loading{
    padding: 0;
}

ul.loading li{
    display: block;
    background-color: white;
    list-style-type: none;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    padding: 0 24px;
}

ul.loading li::before{
    content: '';
    display: block;
    height: 23px;
    width: 60px;
}

ul.loading li::after{
    content: '';
    display: block;height: 24px;
    width: 24px;
    border-radius: 24px;
    animation-delay: 1s;
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
