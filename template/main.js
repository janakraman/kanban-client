const app = new Vue({
  el: "#app",
  data: {
    server: "http://localhost:3000",
    currentPage: "", // login, main-page, organization
    loginInput: "",
    loginPassword: "",
    registerUsername: "",
    registerPassword: "",
    registerEmail: "",
    registerFirstName: "",
    registerLastName: "",
    organizationInput: "",
    organizationSelect: "",
    organizations: [],
    tasks: [],
    showAddBtnBacklog: true,
    showAddFormBacklog: false,
    newBacklog: "",
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (!localStorage.access_token) {
        this.movePage("login");
      } else {
        this.movePage("main-page");
        this.renderMainPage();
      }
    },
    login() {
      axios({
        method: "POST",
        url: this.server + "/login",
        data: {
          input: this.loginInput,
          password: this.loginPassword,
        },
      })
        .then((response) => {
          localStorage.access_token = response.data.access_token;
          this.loginInput = "";
          this.loginPassword = "";
          this.registerUsername = "";
          this.registerPassword = "";
          this.registerEmail = "";
          this.registerFirstName = "";
          this.registerLastName = "";
          this.checkAuth();
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
    register() {
      axios({
        url: this.server + "/register",
        method: "POST",
        data: {
          username: this.registerUsername,
          password: this.registerPassword,
          email: this.registerEmail,
          firstName: this.registerFirstName,
          lastName: this.registerLastName,
        },
      })
        .then((response) => {
          console.log(response);
          this.loginInput = this.registerUsername;
          this.loginPassword = this.registerPassword;
          this.login();
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
    logout() {
      localStorage.clear();
      this.checkAuth();
    },
    movePage(page) {
      this.currentPage = page;
    },
    renderMainPage() {
      this.tasks = [];
      axios({
        url: this.server + "/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          // console.log(response.data);
          response.data.forEach((task) => this.tasks.push(task));
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
    addFormBacklog() {
      this.showAddBtnBacklog = false;
      this.showAddFormBacklog = true;
      this.renderMainPage();
    },
    cancelAddBacklog() {
      this.showAddBtnBacklog = true;
      this.showAddFormBacklog = false;
      this.newBacklog = "";
      this.renderMainPage();
    },
    addNewBacklog() {
      const title = this.newBacklog;
      const CategoryId = 1;

      axios({
        url: this.server + "/tasks",
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          title,
          CategoryId,
        },
      })
        .then((response) => {
          console.log(response);
          this.cancelAddBacklog();
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
    editTask(id) {
      console.log("halo ini edit " + id);
    },
    deleteTask(id) {
      console.log("halo ini delete " + id);
      axios({
        url: this.server + "/tasks/" + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response);
          this.renderMainPage();
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
          this.renderMainPage();
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
          console.log(response);
          this.organizationSelect = "";
          this.movePage("main-page");
          this.renderMainPage();
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
  },
  computed: {
    backlog() {
      return this.tasks.filter((task) => task.CategoryId === 1);
    },
    todo() {
      return this.tasks.filter((task) => task.CategoryId === 2);
    },
    doing() {
      return this.tasks.filter((task) => task.CategoryId === 3);
    },
    done() {
      return this.tasks.filter((task) => task.CategoryId === 4);
    },
  },
});
