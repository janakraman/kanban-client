<template>
  <div id="app">
    <!----------------------------------- LOGIN ----------------------------------->
    <div
      class="container my-5 text-white"
      id="login-page"
      v-if="currentPage === 'login'"
    >
      <login-form
        @login="login"
        @loginWithGoogle="loginWithGoogle"
        @movePage="movePage"
      ></login-form>
    </div>
    <!-------------------------------- END OF LOGIN -------------------------------->

    <!----------------------------------- REGISTER ----------------------------------->
    <div
      class="container my-5 text-white"
      id="register-page"
      v-if="currentPage === 'register'"
    >
      <register-form @register="register" @movePage="movePage"></register-form>
    </div>

    <!-------------------------------- END OF REGISTER -------------------------------->

    <!----------------------------------- NAVBAR ----------------------------------->
    <div id="main-page">
      <nav
        class="navbar navbar-expand navbar-dark bg-dark"
        v-if="currentPage === 'main-page' || currentPage === 'organization'"
      >
        <div class="container-fluid justify-content-around">
          <a class="navbar-brand" href="#">Kanban</a>
          <div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  @click.prevent="movePage('main-page')"
                  >Tasks</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="renderOrganization"
                  >Organization</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-------------------------------- END OF NAVBAR -------------------------------->

      <!----------------------------------- ORGANIZATION ----------------------------------->
      <div
        class="container my-5 text-white"
        v-if="currentPage === 'organization'"
      >
        <h1 class="text-center">Organization</h1>
        <div class="container">
          <div class="row">
            <div class="col-6">
              <form>
                <div class="mb-3">
                  <label for="login-input" class="form-label"
                    >Add new organization</label
                  >
                  <input
                    v-model="organizationInput"
                    type="text"
                    class="form-control"
                  />
                </div>
                <button
                  type="submit"
                  class="btn custom-color-1"
                  @click.prevent="addOrg"
                >
                  Add
                </button>
              </form>
            </div>
            <div class="col-6">
              <form>
                <div class="mb-3">
                  <label for="organization-input" class="form-label"
                    >Select an organization</label
                  >
                  <select v-model="organizationSelect" class="form-select">
                    <option
                      v-for="org in organizations"
                      :key="org.id"
                      :value="org.id"
                    >
                      {{ org.name }}
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  class="btn custom-color-1"
                  @click.prevent="selectOrg"
                >
                  Select
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-------------------------------- END OF ORGANIZATION -------------------------------->

      <!----------------------------------- TASKS ----------------------------------->
      <div v-if="currentPage === 'main-page'">
        <div class="container my-4">
          <div class="row">
            <!----------------------------------- CATEGORY CARD ----------------------------------->
            <categories-card
              v-for="(category, i) in categoriesArr"
              :key="category.id"
              :categoryId="category.id"
              :tasks="tasksArr[i]"
              :category="category"
              :categories="categoriesArr"
              :currentUser="currentUser"
              @addNewTask="addNewTask"
              @unauthorizedAlert="unauthorizedAlert"
              @editTask="editTask"
              @deleteTask="deleteTask"
            >
            </categories-card>

            <!----------------------------------- Todo ----------------------------------->
            <!-- <categories-card></categories-card> -->

            <!----------------------------------- Doing ----------------------------------->
            <!-- <categories-card></categories-card> -->

            <!----------------------------------- Done ----------------------------------->
            <!-- <categories-card></categories-card> -->
          </div>
        </div>
      </div>
      <!-------------------------------- END OF TASKS -------------------------------->
    </div>
    <!-------------------------------- END OF MAIN PAGE -------------------------------->
  </div>
  <!-------------------------------- END OF APP -------------------------------->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import CategoriesCard from "./components/CategoriesCard.vue";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default {
  name: "App",
  data() {
    return {
      message: "Hello World",
      server: "https://kanban-jan-server.herokuapp.com",
      currentPage: "",
      currentUser: {},
      tasks: [],
      categories: [],
      taskAuth: "",
      organizationInput: "",
      organizationSelect: "",
      organizations: [],
    };
  },
  components: {
    LoginForm,
    RegisterForm,
    CategoriesCard,
  },
  methods: {
    fetchUser() {
      axios({
        url: this.server + "/user",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.currentUser = data.user;
          this.organizationSelect = data.user.Organization.id;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    fetchTasks() {
      axios({
        url: this.server + "/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    fetchCategories() {
      axios({
        url: this.server + "/categories",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.categories = data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    checkAuth() {
      if (!localStorage.access_token) {
        this.movePage("login");
      } else {
        this.movePage("main-page");
        this.fetchCategories();
        this.fetchTasks();
        this.fetchUser();
      }
    },
    movePage(page) {
      this.currentPage = page;
    },
    login(data) {
      axios({
        method: "POST",
        url: this.server + "/login",
        data,
      })
        .then((response) => {
          localStorage.access_token = response.data.access_token;
          this.checkAuth();
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          return axios({
            method: "POST",
            url: this.server + "/loginGoogle",
            data: GoogleUser.Bc,
          });
        })
        .then((response) => {
          localStorage.access_token = response.data.access_token;
          this.checkAuth();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    register(data) {
      axios({
        url: this.server + "/register",
        method: "POST",
        data,
      })
        .then((response) => {
          console.log(response);
          this.checkAuth();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message[0],
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    logout() {
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
      this.checkAuth();
    },
    addNewTask(data) {
      axios({
        url: this.server + "/tasks",
        method: "POST",
        data,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response);
          this.newTask = "";
          this.fetchTasks();
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message[0],
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    unauthorizedAlert() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unauthorized",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-right",
      });
    },
    editTask(data) {
      const id = data.id;
      const { title, CategoryId } = data;
      axios({
        url: this.server + "/tasks/" + id,
        method: "PUT",
        data: {
          title,
          CategoryId,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response);
          this.fetchTasks();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            if (typeof error.response.data.message === "string") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: "top-right",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message[0],
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: "top-right",
              });
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return axios({
              url: this.server + "/tasks/" + id,
              method: "DELETE",
              headers: {
                access_token: localStorage.access_token,
              },
            });
          }
        })
        .then((response) => {
          // console.log(response);
          if (response) {
            this.fetchTasks();
            Swal.fire("Deleted!", "Task has been deleted.", "success");
          }
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    renderOrganization() {
      axios({
        url: this.server + "/organizations",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          this.organizations = [];
          // console.log(response.data);
          response.data.forEach((org) => {
            this.organizations.push(org);
          });
          this.movePage("organization");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    addOrg() {
      const name = this.organizationInput;
      let id;
      axios({
        url: this.server + "/organizations",
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name,
        },
      })
        .then((response) => {
          // console.log(response);
          id = response.data.id;
          return axios({
            url: this.server + "/selectOrg",
            method: "PATCH",
            headers: {
              access_token: localStorage.access_token,
            },
            data: {
              OrganizationId: id,
            },
          });
        })
        .then((response) => {
          // console.log(response);
          this.organizationInput = "";
          this.movePage("main-page");
          this.fetchTasks();
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message[0],
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    selectOrg() {
      const id = this.organizationSelect;
      axios({
        url: this.server + "/selectOrg",
        method: "PATCH",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          OrganizationId: id,
        },
      })
        .then((response) => {
          // console.log(response);
          // this.organizationSelect = "";
          this.movePage("main-page");
          this.fetchTasks();
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please select an organization",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-right",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
  created() {
    this.checkAuth();
  },
  computed: {
    categoriesArr() {
      let temp = [];
      this.categories.forEach((category) => {
        temp.push(category);
      });
      return temp;
    },
    tasksArr() {
      let temp = [];
      this.categories.forEach((category) => {
        temp.push(this.tasks.filter((task) => task.CategoryId === category.id));
      });
      return temp;
    },
  },
};
</script>

<style>
</style>