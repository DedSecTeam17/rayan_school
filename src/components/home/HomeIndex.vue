<template>
    <div style="margin-top: 5%">

        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="row">
                    <div class="col-md-2">
                        <button @click="toCreate" type="button"
                                class="btn btn-outline-primary  mb-3 align-content-lg-start"><i
                                class="fas fa-user-plus"></i>
                            New Student
                        </button>
                    </div>
                </div>

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Full Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Study fees</th>
                        <!--                        <th scope="col">Remaining fees</th>-->
                        <!--                        <th scope="col">Installments</th>-->
                        <th scope="col">View</th>
                        <th scope="col">Delete</th>


                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="(student) in students">
                        <th scope="row">1</th>
                        <td>{{student["fullName"]}}</td>
                        <td>{{student["class"]}}grade</td>
                        <td>{{student["fees"]}} SDG</td>
                        <!--                        <td>15.000 SDG</td>-->
                        <!--                        <td>3</td>-->
                        <td>
                            <button @click="viewStudent(student)" type="button"
                                    class="btn btn-outline-primary  mb-3 align-content-lg-start">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                        <td>
                            <button @click="deleteStudent(student)" type="button"
                                    class="btn btn-outline-danger mb-3 align-content-lg-start">
                                <i class="fas fa-user-minus"></i>
                            </button>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>

        </div>


    </div>
</template>

<script>
    import {db} from "../../main";

    export default {
        name: "HomeIndex",
        data() {
            return {
                students: [],
                studentsRefs: [],

                isLoading: false
            }
        },
        created() {
            this.getAllStudents();
        },
        methods: {

            async getAllStudents() {
                let querySnapshot = await db.collection('students').get()
                this.students =
                    querySnapshot.docs.map((doc) => doc.data());
                this.studentsRefs =
                    querySnapshot.docs.map((doc) => doc.ref.id);
                this.isLoading = false;

                //
                // .then(querySnapshot => {

                //
                //     // do something with documents
                // })
            },
            toCreate() {
                this.$router.push("/home/create");

            },
            viewStudent(student) {
                let ref = this.studentsRefs[this.students.indexOf(student)];
                this.$router.push(`${ref}/view`);

            },
            deleteStudent(student) {
                let ref = this.studentsRefs[this.students.indexOf(student)];
                db.collection('students').doc(ref).delete().then((res) => {
                    this.getAllStudents();
                })

            }
        }
    }
</script>

<style scoped>

</style>
