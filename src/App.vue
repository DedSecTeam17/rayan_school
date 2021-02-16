<template>
    <div id="app">
        <MainApp></MainApp>
    </div>
</template>

<script>
    // import MainApp from './components/MainApp.vue'
    import SignIn from "./components/Auth/SignIn";
    import MainApp from "./components/MainApp";

    export default {
        name: 'App',
        components: {
            MainApp,
            SignIn,
        }
    }
</script>

<style>
    #app {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
        /*color: #2c3e50;*/
        /*margin-top: 60px;*/
    }
</style>
