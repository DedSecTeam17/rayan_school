<template>
<div>


<!--    here dashboard rendred -->
    <NavBar></NavBar>
    <router-view></router-view>

</div>
</template>

<script>
    import NavBar from "../partials/NavBar";
    export default {
        name: "HomePage",
        components: {NavBar}
    }
</script>

<style scoped>

</style>
