<template>
    <nav v-if="isAuth" class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#"><img src="@/assets/logo.png" width="50" height="50"
                                              class="rounded-circle img-fluid">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
            </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link active-class="active" class="nav-link" to="/Home/index">Home
                    </router-link>

                </li>


<!--                <li class="nav-item active">-->
<!--                    <router-link active-class="active" class="nav-link" to="/Home/index"><i class="fa fa-home"></i>Home-->
<!--                    </router-link>-->

<!--                </li>-->
            </ul>

            <ul class="navbar-nav">


                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </a>
                    <div class="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdown">
                        <a @click="signOut" class="dropdown-item" href="#">Log out</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {UserSession} from "../../services/users_session_services";

    export default {
        name: "NavBar",
        data() {
            return {
                isAuth: UserSession.isAuth()
            }
        },
        methods: {
            signOut() {

                this.firebaseAuth.signOut()
                    .then(() => {
                        UserSession.destroyToken();
                        this.$router.push("/sign_in");
                    }).catch(err => console.log(error));

            }
        }
    }
</script>

<style scoped>

</style>
