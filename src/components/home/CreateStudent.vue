<template>
    <div>
        <div class="row mt-4">

            <div class="col-md-4 offset-md-4">

                <div class="card">

                    <div class="card-body">
                        <div class="needs-validation">
                            <form @submit.prevent="submit" class="needs-validation" novalidate>
                                <div class="form-group row mx-2">
                                    <label class="form-label " for="fullName">Student Full Name</label>
                                    <input :class="{'is-invalid':$v.fullName.$error,'is-valid':!$v.fullName.$invalid}"
                                           v-model.trim="$v.fullName.$model" class="form-control"
                                           placeholder="Full name"
                                           id="fullName" name="email"
                                           type="email">
                                    <p class="invalid-feedback" v-if="!$v.fullName.required">Full name required</p>
                                </div>
                                <div class="form-group row  mx-2">
                                    <label class="form-label " for="class">Class</label>
                                    <input :class="{'is-invalid':$v.studentClass.$error,'is-valid':!$v.studentClass.$invalid}"
                                           v-model.trim="$v.studentClass.$model" class="form-control "
                                           id="class" placeholder="Class"
                                           name="password" type="number">

                                    <p class="invalid-feedback" v-if="!$v.studentClass.required">Class required</p>

                                </div>
                                <div class="form-group row  mx-2">
                                    <label class="form-label " for="fess">Class</label>
                                    <input :class="{'is-invalid':$v.fees.$error,'is-valid':!$v.fees.$invalid}"
                                           v-model.trim="$v.fees.$model" class="form-control "
                                           id="fess" placeholder="Fees"
                                           name="password" type="number">

                                    <p class="invalid-feedback" v-if="!$v.fees.required">Fees required</p>

                                </div>


                                <button type="submit" class="btn btn-outline-primary ">
                                    <span v-if="this.isLoading" class="spinner-border text-light" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </span>
                                    <span v-else> <i class="fas fa-plus"></i>Create Student</span>

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
        name: "CreateStudent",
        data() {
            return {
                fullName: '',
                studentClass: '',
                fees: '',

                showError: false,
                error_data: "",
                isLoading: false
            }
        },
        validations: {

            fullName: {
                required
            },
            studentClass: {
                required

            },
            fees: {
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
                    this.createStudent();
                }
            },
            async createStudent() {
                //reference
                try {
                    let reference = await db.collection('students').add({
                        "fullName": this.fullName,
                        "class": this.studentClass,
                        "fees": this.fees,
                    });
                    this.isLoading = false

                    await this.$router.push("/home/index");

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
