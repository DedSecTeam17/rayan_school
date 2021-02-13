<template>
    <div>

        <div class="row m-2" v-if="!isLoading">


            <!--            user info-->
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body ">
                        <div class="row">
                            <p class="col-md-6"><i class="fas fa-graduation-cap"> </i> {{student["fullName"]}}</p>
                            <p class="col-md-6"><i class="fas fa-school"></i> {{student["class"]}} grade</p>
                        </div>
                        <div class="row">
                            <p class="col-md-6"><i class="fas fa-money-bill-wave"></i> Fees {{student["fees"]}} SDG</p>
                            <p class="col-md-6"><i class="fas fa-money-bill-wave"></i> Remaining fees {{remainingFee}}
                                SDG</p>
                        </div>
                    </div>
                </div>
                <table class="table" v-if="!isCreatingInstallments">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Installments Title</th>
                        <th scope="col">Installments fee</th>
                        <th scope="col">Delete</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(inst) in studentInstallments">
                        <th scope="row">1</th>
                        <td>{{inst["title"]}}</td>
                        <td>{{inst["fees"]}}</td>
                        <td>
                            <button @click="deleteInstallments(inst)" type="button"
                                    class="btn btn-outline-danger mb-3 align-content-lg-start">
                                <i class="fas fa-minus"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--            <div class="col-md-3">-->

            <!--            </div>-->

            <!--            -->
            <div class="col-md-3">

                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="submit" class="needs-validation" novalidate>
                            <div class="form-group row mx-2">
                                <label class="form-label " for="installments">Installments Title</label>
                                <input :class="{'is-invalid':$v.installments.$error,'is-valid':!$v.installments.$invalid}"
                                       v-model.trim="$v.installments.$model" class="form-control"
                                       placeholder="March installments"
                                       id="installments" name="installments"
                                       type="text">
                                <p class="invalid-feedback" v-if="!$v.installments.required">Installments title
                                    required</p>
                            </div>
                            <div class="form-group row  mx-2">
                                <label class="form-label " for="fees">Fee</label>
                                <input :class="{'is-invalid':$v.fees.$error,'is-valid':!$v.fees.$invalid}"
                                       v-model.trim="$v.fees.$model" class="form-control "
                                       id="fees" placeholder="fees"
                                       name="Fees" type="number">

                                <p class="invalid-feedback" v-if="!$v.fees.required">Fees required</p>

                            </div>
                            <button type="submit" class="btn btn-primary ">Create Installments</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {db} from "../../main";

    export default {
        name: "VueStudent",
        data() {
            return {
                student: {},
                student_id: "",
                studentInstallments: [],
                studentInstallmentsRef: [],
                remainingFee: 0.0,

                installments: '',
                fees: '',
                showError: false,
                error_data: "",
                isLoading: false,
                isCreatingInstallments: false,
                isLoadingInstallments: false

            }
        },
        validations: {

            installments: {
                required
            },
            fees: {
                required

            }

        },
        created() {
            this.getInfoById();
        },
        methods: {


            async getInstallments() {
                try {
                    this.isLoadingInstallments = true;
                    let refId = this.$route.params["id"];

                    let querySnapshot = await db.doc(`students/${refId}/`)
                        .collection("installments")
                        .get();

                    this.studentInstallments =
                        querySnapshot.docs.map((doc) => doc.data());
                    this.studentInstallmentsRef =
                        querySnapshot.docs.map((doc) => doc.ref.id);

                    let totalInst = 0;

                    // this.studentInstallments.foreach((item)=>{
                    //
                    // } )
                    for (let inst = 0; inst < this.studentInstallments.length; inst++) {
                        totalInst += parseInt(this.studentInstallments[inst]["fees"])

                    }

                    console.log("fk")
                    this.isLoadingInstallments = false;

                    this.remainingFee = (parseInt(this.student["fees"]) - totalInst);

                } catch (e) {
                    this.isLoadingInstallments = false;

                }
            },

            async createInstallment() {
                this.isCreatingInstallments = true;
                let refId = this.$route.params["id"];

                if (this.fees <= this.remainingFee) {
                    try {
                        let reference = await db.doc(`students/${refId}/`).collection("installments").add({
                            "title": this.installments,
                            "fees": this.fees,
                        });

                        this.isCreatingInstallments = false;
                        this.getInfoById();

                    } catch (e) {
                        console.log(e)
                        this.isCreatingInstallments = false;

                    }
                } else {
                    this.$toasted.error("Installments should be less than total fee", {
                        duration: 60 * 60,
                        position: 'top-center'
                    })
                    this.isCreatingInstallments = false;

                }


            },
            async deleteInstallments(installments) {
                let ref = this.studentInstallmentsRef[this.studentInstallments.indexOf(installments)];
                let refId = this.$route.params["id"];

                db.collection(`students/${refId}/installments`).doc(ref).delete().then((res) => {
                    this.getInfoById();
                })

            },


            getInfoById() {
                this.isLoading = true;
                let refId = this.$route.params["id"];
                console.log(refId)

                db.collection("students")
                    .doc(refId)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        if (document["installments"]) {
                            this.studentInstallments = document["installments"];
                        }
                        this.student_id = snapshot.id;
                        this.student = document;
                        // do something with document
                        this.isLoading = false;
                        this.getInstallments();


                    }).catch(e => {
                    console.log(e)
                    this.isLoading = false;

                })
            },
            submit() {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log('invalid')
                } else {
                    console.log('valid')
                    // this.isLoading = true
                    this.createInstallment();
                }
            },
            createStudent() {
                // this.$router.push("/home/index");

                //    reload data

            }
        }
    }
</script>

<style scoped>

</style>
