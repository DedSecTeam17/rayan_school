<template>

    <div>


        <div class="row mt-4">

            <div class="col-md-4 offset-md-4">

                <div class="card">
                    <div>
                        <p class="text-center">
                            <img src="@/assets/logo.png" width="180" height="180" class="rounded-circle">
                        </p>
                    </div>
                    <div class="card-body">
                        <div class="needs-validation">
                            <form @submit.prevent="submit" class="needs-validation" novalidate>
                                <div class="form-group row mx-2">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input :class="{'is-invalid':$v.email.$error,'is-valid':!$v.email.$invalid}"
                                           v-model.trim="$v.email.$model" class="form-control" placeholder="Email"
                                           id="exampleInputEmail1" name="email"
                                           type="email">
                                    <p class="invalid-feedback" v-if="!$v.email.email">invalid email</p>
                                    <p class="invalid-feedback" v-if="!$v.email.required">Email required</p>
                                </div>
                                <div class="form-group row mx-2">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input :class="{'is-invalid':$v.password.$error,'is-valid':!$v.password.$invalid}"
                                           v-model.trim="$v.password.$model" class="form-control "
                                           id="exampleInputPassword1" placeholder="Password"
                                           name="password" type="password">

                                    <p class="invalid-feedback" v-if="!$v.password.minLength">min length is 6
                                        character</p>
                                    <p class="invalid-feedback" v-if="!$v.password.required">Password required</p>

                                </div>
                                <button type="submit" class="btn btn-warning btn-block  text-center">
                                    <span v-if="this.isLoading" class="spinner-border text-light" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </span>
                                    <span v-else>Sign In</span>

                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators'
    import {UserSession} from "../../services/users_session_services";

    export default {
        name: "SignIn",
        data() {
            return {
                password: '',
                email: '',
                showError: false,
                error_data: "",
                isLoading: false
            }
        },
        validations: {

            email: {
                required, email
            },
            password: {
                required,
                minLength: minLength(6)
            }

        },
        methods: {
            submit() {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log('invalid')
                } else {
                    console.log('valid')
                    this.isLoading = true
                    this.SignIn();
                }
            },
            SignIn() {
                this.firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        if (user) {
                            this.firebaseAuth.onAuthStateChanged((user) => {
                                if (user) {
                                    user.getIdToken().then((token) => {
                                        UserSession.setToken(token)
                                        this.isLoading = false;
                                        this.$router.push("/home/index");
                                    });
                                }
                            });

                        }else{
                            this.$toasted.error("No valid user", {duration: 60 * 60, position: 'top-center'})
                            this.isLoading = false

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toasted.error(err.message, {duration: 60 * 60, position: 'top-center'})
                        this.isLoading = false
                    });

            }
        }
    }
</script>

<style scoped>

</style>
