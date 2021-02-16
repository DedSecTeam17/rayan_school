import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import SignIn from "./components/Auth/SignIn";
import {UserSession} from "./services/users_session_services";
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted';

// import 'bootstrap'
//
// import 'bootstrap/dist/css/bootstrap.min.css'

import {firestorePlugin} from 'vuefire'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import HomePage from "./components/home/HomePage";
// import Toasted from 'vue-toasted';

import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import ViewStudent from "./components/Students/ViewStudent";
import CreateStudent from "./components/Students/CreateStudent";
import GradesIndex from "./components/grades/GradesIndex";
import CreateGrade from "./components/grades/CreateGrade";
import StudentsIndex from "./components/Students/StudentsIndex";
import UpdateGrade from "./components/grades/UpdateGrade";
import GradesMain from "./components/grades/GradesMain";
import StudentMainPage from "./components/Students/StudentMainPage";

// setup vue router

Vue.use(VueRouter);
Vue.use(firestorePlugin)
Vue.use(Vuelidate)
Vue.use(Toasted)

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: "AIzaSyDR-iV1XVBwsQ17p9FsXEhwxL4vKqrIgHM",
    authDomain: "scoolapp-add72.firebaseapp.com",
    projectId: "scoolapp-add72",
    storageBucket: "scoolapp-add72.appspot.com",
    messagingSenderId: "885231144399",
    appId: "1:885231144399:web:71fb884ca924235f4296ba",
    measurementId: "G-JG90RKT2RN"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
Vue.prototype.firebase = firebase;
Vue.prototype.firebaseDb = firebaseApp.database();
Vue.prototype.firebaseAuth = firebaseApp.auth();

export const db = firebaseApp.firestore();
// window.db = db;

const {TimeStamp, GeoPoint} = firebase.firestore
export {TimeStamp, GeoPoint}

// if using Firebase JS SDK < 5.8.0
db.settings({timestampsInSnapshots: true})


const routes = [
    {
        path: '/home',
        component: HomePage,
        children: [
            {
                path: 'grades', component: GradesMain, meta: {
                    requiresAuth: true
                },
                children: [
                    {
                        path: 'index', component: GradesIndex, meta: {
                            requiresAuth: true
                        },
                    },
                    {
                        path: 'create', component: CreateGrade, meta: {
                            requiresAuth: true
                        },
                    },
                    {
                        path: ':grade_id/update', component: UpdateGrade, meta: {
                            requiresAuth: true
                        },
                    },
                    {
                        path: ':grade_id/students', component: StudentMainPage, meta: {
                            requiresAuth: true
                        },
                        children: [
                            {
                                path: 'index', component: StudentsIndex, meta: {
                                    requiresAuth: true
                                },

                            },

                            {
                                path: 'create', component: CreateStudent, meta: {
                                    requiresAuth: true
                                },

                            },
                            {
                                path: ':id/view', component: ViewStudent, meta: {
                                    requiresAuth: true
                                },

                            },
                        ]

                    },
                ]

            },
            // {
            //     path: 'create', component: CreateStudent, meta: {
            //         requiresAuth: true
            //     },
            // },
            // {
            //     path: ':id/view', component: ViewStudent, meta: {
            //         requiresAuth: true
            //     },
            // },

        ]
    },
    {
        path: '/sign_in',
        component: SignIn
    },
    {
        path: '*',
        component: SignIn
    }

];


const router = new VueRouter({routes, linkActiveClass: "active",})

router.beforeEach(((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requireAuth) {
        if (UserSession.isAuth()) {
            next()
        } else {
            next('/sign_in')

        }
    } else {

        if (UserSession.isAuth()) {
            next('/home/grades/index')
        } else {

            next()

        }
    }
}));


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
