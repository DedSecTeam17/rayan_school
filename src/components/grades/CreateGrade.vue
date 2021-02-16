<template>
    <div>
        <div class="row mt-4">

            <div class="col-md-4 offset-md-4">

                <div class="card">

                    <div class="card-body">
                        <div class="needs-validation">
                            <form @submit.prevent="submit" class="needs-validation" novalidate>
                                <div class="form-group row mx-2">
                                    <label class="form-label " for="gradeName">Name</label>
                                    <input :class="{'is-invalid':$v.gradeName.$error,'is-valid':!$v.gradeName.$invalid}"
                                           v-model.trim="$v.gradeName.$model" class="form-control"
                                           placeholder="Grade Name"
                                           id="gradeName" name="gradeName"
                                           type="text">
                                    <p class="invalid-feedback" v-if="!$v.gradeName.required">Required</p>
                                </div>

                                <button type="submit" class="btn btn-outline-primary ">
                                    <span v-if="this.isLoading" class="spinner-border text-light" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </span>
                                    <span v-else> <i class="fas fa-plus mx-1"></i>Create Grade</span>

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
    import {email, minLength, required} from "vuelidate/lib/validators";
    import {UserSession} from "../../services/users_session_services";
    import {db} from "../../main";

    export default {
        name: "CreateGrade",
        data() {
            return {
                gradeName: '',
                showError: false,
                error_data: "",
                isLoading: false
            }
        },
        validations: {

            gradeName: {
                required
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
                    this.createGrade();
                }
            },
            async createGrade() {
                //reference
                try {
                    let reference = await db.collection('grades').add({
                        "name": this.gradeName,
                    });
                    this.isLoading = false

                    await this.$router.push("/home/grades/index");

                } catch (e) {
                    this.isLoading = false

                    console.log(e)

                }

            }
        }
    }
</script>

<style scoped>

</style>
