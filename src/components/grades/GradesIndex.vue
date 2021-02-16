<template>
    <div style="margin-top: 5%">

        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="row">
                    <div class="col-md-8 offset-md-2 ">
                        <button @click="toCreate" type="button"
                                class="btn btn-outline-primary  mb-3 align-content-lg-start">
                            <i class="fas fa-plus-circle mx-1"></i> New Grade
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <table class="table table-striped">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Grade Name</th>
                                <th scope="col">Students</th>
                                <th scope="col">View Students</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>


                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(grade) in  grades">
                                <th scope="row">1</th>
                                <td>{{grade["name"]}}</td>
                                <td><span class="p-2 badge badge-pill badge-primary">{{grade["studentCount"]}}</span></td>
                                <td>
                                    <button @click="viewGradeStudents(grade)" type="button"
                                            class="btn btn-outline-primary  mb-3 align-content-lg-start">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                                <td>
                                    <button @click="editGrade(grade)" type="button"
                                            class="btn btn-outline-secondary mb-3 align-content-lg-start">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                                <td>
                                    <button @click="deleteGrade(grade)" type="button"
                                            class="btn btn-outline-danger mb-3 align-content-lg-start">
                                        <i class="fas fa-backspace"></i>
                                    </button>
                                </td>

                            </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>


    </div>
</template>

<script>
    import {db} from "../../main";

    export default {
        name: "GradesIndex",
        data() {
            return {
                grades: [],
                gradesRefs: [],

                isLoading: false
            }
        },
        created() {
            this.getAllGrades();
        },
        methods: {

            async getAllGrades() {
                this.grades = [];
                let querySnapshot = await db.collection('grades').get()
                console.log(querySnapshot._docs)
                this.gradesRefs =
                    querySnapshot.docs.map((doc) => doc.ref.id);
                // let grades =
                //      querySnapshot.docs.map((doc) => doc.data());

                for (const gradeRef of this.gradesRefs) {

                    let studentRef = await db.doc(`grades/${gradeRef}`).collection("students").get();
                    let grade = querySnapshot.docs[this.gradesRefs.indexOf(gradeRef)];
                    this.grades.push({
                        "name": grade.data()["name"],
                        "studentCount": studentRef.docs ? studentRef.docs.length : 0
                    })

                }

                this.isLoading = false;

                //
                // .then(querySnapshot => {

                //
                //     // do something with documents
                // })
            },
            toCreate() {
                this.$router.push("/home/grades/create");

            },
            viewGradeStudents(grade) {
                let ref = this.gradesRefs[this.grades.indexOf(grade)];
                this.$router.push(`${ref}/students/index`);

            },
            editGrade(grade) {
                let ref = this.gradesRefs[this.grades.indexOf(grade)];
                this.$router.push(`${ref}/update`);

            },
            deleteGrade(grade) {
                let ref = this.gradesRefs[this.grades.indexOf(grade)];
                db.collection('grades').doc(ref).delete().then((res) => {
                    this.getAllGrades();
                })

            }
        }
    }
</script>

<style scoped>

    #grade_item:hover {
        background-color: dodgerblue;
        color: white;
        cursor: pointer;
    }

    #student_counts {
        background-color: dodgerblue;
        color: white;
        border-radius: 100px;
    }

</style>
