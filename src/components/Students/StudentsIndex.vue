<template>
    <div style="margin-top: 5%">


        <div class="row">



            <div class="col-md-12">

                <div class="row m-4">
                  <div class="cold-md-10 offset-md-1">
                      <nav aria-label="breadcrumb">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item " aria-current="page">Grades</li>
                              <li class="breadcrumb-item active" aria-current="page">{{grade["name"]}}</li>

                          </ol>
                      </nav>
                  </div>
                </div>


                <div class="row">
                    <div class="col-md-10 offset-md-1">

                        <div class="row m-3">
                            <button @click="toCreate" type="button"
                                    class="btn btn-outline-primary   mb-3 align-content-lg-start"><i
                                    class="fas fa-user-plus"></i>
                                New Student
                            </button>
                        </div>

                    </div>

                </div>

                <div class="row">
                    <div class="col-md-1 ">

                    </div>
                    <div class="col-md-2">
                        <div class="my-card">
                            <i class="fas fa-user-graduate" style="font-size: xx-large"></i><br>
                            <p style="font-size: large">{{paidStudent.length}} Student</p>
                            <span class="mark"><i class="far fa-check-circle mx-1"></i> Fully paid</span>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <div class="my-card">
                            <i class="fas fa-user-graduate" style="font-size: xx-large"></i><br>
                            <p style="font-size: large">{{partiallyPaidStudents.length}} Student</p>
                            <span class="markWarning"><i class="far fa-clock mx-1"></i>Partially paid</span>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <div class="my-card">
                            <i class="fas fa-user-graduate" style="font-size: xx-large"></i><br>
                            <p style="font-size: large">{{notPaidStudents.length}} Student</p>
                            <span class="markRed"><i class="fas fa-user-times mx-1"></i>Not paid</span>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <div class="my-card">
                            <i class="fas fa-wallet" style="font-size: xx-large"></i><br>
                            <p style="font-size: large">{{totalMoney}} SDG</p>
                            <span class="mark"><i class="fas fa-money-bill-alt mx-1"></i>Total Cash</span>

                            <!--                    <p><i class="fas fa-wallet"></i> 2000 SDG </p>-->
                        </div>

                    </div>
                    <div class="col-md-2">
                        <div class="my-card">
                            <i class="fas fa-wallet" style="font-size: xx-large"></i><br>
                            <p style="font-size: large">{{totalInstallmentMoney}} SDG</p>
                            <span class="mark"><i class="fas fa-money-bill-alt mx-1"></i>Total Installment</span>

                            <!--                    <p><i class="fas fa-wallet"></i> 2000 SDG </p>-->
                        </div>

                    </div>
                    <div class="col-md-1 ">

                    </div>

                </div>
                <div class="row mb-2">
                    <div class="col-md-10 offset-md-1">

                        <form class="form-inline my-2 my-lg-0">
                            <input v-model="searchWord" class="form-control mr-sm-2" type="search" style="width: 80%"
                                   placeholder="Search" aria-label="Search">
                            <button @click="search" v-if="students.length>0" class="btn btn-outline-success mx-1"
                                    type="submit"><i class="fas fa-search"></i> Search
                            </button>
                            <button @click="getAllStudents" class="btn btn-outline-secondary my-2 mx-1" type="submit"><i
                                    class="fas fa-times"></i></button>

                        </form>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-10 offset-md-1">


                        <table class="table table-striped table-dark">
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

                            <tr v-for="(student , index)  in students">
                                <th scope="row">{{index+=1}}</th>
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
                searchWord: "",
                studentsRefs: [],
                paidStudent: [],
                partiallyPaidStudents: [],
                notPaidStudents: [],
                totalMoney: 0.0,
                totalInstallmentMoney: 0.0,

                grade: {},
                isLoading: false
            }
        },
        created() {
            this.getGradeInfo();
        },
        methods: {

            search() {
                var self = this;


                this.students = this.students.filter(function (student) {
                    return student.fullName.toLowerCase().indexOf(self.searchWord.toLowerCase()) >= 0;
                });
            },

            async getGradeInfo() {
                let refId = this.$route.params["grade_id"];

                this.isLoading = true;
                db.collection("grades")
                    .doc(refId)
                    .get()
                    .then(snapshot => {
                        this.grade = snapshot.data();
                        // this.isLoading = false;
                        this.getAllStudents();
                    }).catch(e => {
                    console.log(e)
                    this.isLoading = false;

                })


            },
            //getTotalInstallment
            getTotalInstallment(installments) {
                console.log(installments)
                let total = 0;
                for (let i = 0; i < installments.length; i++) {
                    total += parseFloat(installments[i].data()["fees"]);
                }
                return total;

            },

            async getAllStudents() {
                this.students = [];
                this.paidStudent = [];
                this.notPaidStudents = [];
                this.partiallyPaidStudents = [];
                this.totalMoney = 0;
                this.totalInstallmentMoney = 0;
                let gradeRef = this.$route.params["grade_id"];

                let querySnapshot = await db.doc(`grades/${gradeRef}`).collection("students").get()
                // this.students =
                //     querySnapshot.docs.map((doc) => doc.data());
                this.studentsRefs =
                    querySnapshot.docs.map((doc) => doc.ref.id);

                for (let std = 0; std < this.studentsRefs.length; std++) {

                    //    get installments

                    let installmentsRef = await db.doc(`grades/${gradeRef}/students/${this.studentsRefs[std]}`).collection("installments").get();
                    console.log(installmentsRef.docs.length)
                    //totalInstallments
                    let totalInstallments = this.getTotalInstallment(installmentsRef.docs);
                    this.totalInstallmentMoney += totalInstallments;
                    console.log(totalInstallments)

                    let student = querySnapshot.docs[std].data();
                    console.log(student)

                    let studentFees = parseFloat(student["fees"]);


                    if (totalInstallments === 0) {
                        this.notPaidStudents.push(student);
                    } else if (totalInstallments > 0 && totalInstallments < studentFees) {
                        this.partiallyPaidStudents.push(student);
                    } else if (totalInstallments === studentFees) {
                        this.paidStudent.push(student)
                    }

                    this.totalMoney += studentFees;
                    this.students.push(student)

                }


                this.isLoading = false;

                //
                // .then(querySnapshot => {

                //
                //     // do something with documents
                // })
            },
            toCreate() {
                this.$router.push("create");

            },
            viewStudent(student) {
                let ref = this.studentsRefs[this.students.indexOf(student)];
                this.$router.push(`${ref}/view`);

            },
            deleteStudent(student) {
                let gradeRef = this.$route.params["grade_id"];

                let ref = this.studentsRefs[this.students.indexOf(student)];
                db.collection(`grades/${gradeRef}/students`).doc(ref).delete().then((res) => {
                    this.getAllStudents();
                })

            }
        }
    }
</script>

<style scoped>


    .my-card {
        background-color: white;
        border: #2c3e50 1px;
        border-radius: 5px;
        padding: 10%;
        margin: 5%;
    }

    .mark {
        color: green;
        border-radius: 20px;
        padding: 10px;
    }

    .markWarning {
        background-color: gold;
        opacity: 0.2;
        color: red;
        border-radius: 20px;
        padding: 10px;
    }

    .markRed {
        background-color: red;
        opacity: 0.2;
        color: yellow;
        border-radius: 20px;
        padding: 10px;
    }
</style>
