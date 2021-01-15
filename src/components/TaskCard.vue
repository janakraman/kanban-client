<template>
  <div>
    <div class="card my-1" v-if="defaultTaskCard">
      <div class="card-body shadow">
        <h6 class="card-title">{{ task.title }}</h6>
        <div class="d-flex justify-content-between row">
          <p
            class="card-text text-muted my-0 col align-bottom"
            style="font-size: 12px"
          >
            By: {{ task.User.username }}
          </p>
          <div class="col-4 align-bottom">
            <a
              class="link-dark text-decoration-none"
              href="#"
              @click.prevent="showEditTask()"
              >✎</a
            >
            <a
              class="link-dark text-decoration-none"
              href="#"
              @click.prevent="showChangeCategoryTask()"
              >⇄</a
            >
            <a
              class="link-dark text-decoration-none"
              href="#"
              @click.prevent="deleteTask(task.id)"
              >⊗</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="card my-1" v-if="editTaskCard">
      <div class="card-body shadow">
        <form>
          <div class="container d-flex justify-content-start p-0">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control flex-grow-1"
                  v-model="taskTitle"
                  id="taskTitle"
                />
              </div>
              <div class="col-2 p-0">
                <button
                  type="submit"
                  class="btn btn-outline-dark"
                  @click.prevent="editTask(task.id)"
                >
                  +
                </button>
              </div>
              <div class="col-2 p-0">
                <button
                  type="submit"
                  class="btn btn-outline-danger"
                  @click.prevent="cancelEditTask"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </form>
        <p
          class="card-text text-muted my-0 col align-middle"
          style="font-size: 12px"
        >
          By: {{ task.User.username }}
        </p>
      </div>
    </div>

    <div class="card my-1" v-if="changeCategoryTaskCard">
      <div class="card-body shadow">
        <form>
          <div class="container d-flex justify-content-center p-0">
            <div class="row">
              <div class="col-7">
                <select v-model="categoryId" class="form-select">
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="col p-0">
                <button
                  type="submit"
                  class="btn btn-outline-dark"
                  @click.prevent="changeCategoryTask(task.id)"
                >
                  +
                </button>
              </div>
              <div class="col p-0">
                <button
                  type="submit"
                  class="btn btn-outline-danger"
                  @click.prevent="cancelEditTask"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </form>
        <p
          class="card-text text-muted my-0 col align-middle"
          style="font-size: 12px"
        >
          By: {{ task.User.username }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task", "currentUser", "categories"],
  data() {
    return {
      taskTitle: this.task.title,
      defaultTaskCard: true,
      editTaskCard: false,
      changeCategoryTaskCard: false,
      categoryId: this.task.CategoryId,
    };
  },
  methods: {
    showEditTask() {
      if (this.task.UserId === this.currentUser.id) {
        this.taskTitle = this.task.title;
        this.defaultTaskCard = false;
        this.editTaskCard = true;
      } else {
        this.$emit("unauthorizedAlert");
      }
    },
    editTask(id) {
      const data = {
        id,
        title: this.taskTitle,
        CategoryId: this.categoryId,
      };
      this.$emit("editTask", data);
      this.cancelEditTask();
    },
    showChangeCategoryTask(id){
      if (this.task.UserId === this.currentUser.id) {
        this.defaultTaskCard = false;
        this.changeCategoryTaskCard = true;
      } else {
        this.$emit("unauthorizedAlert");
      }
    },
    changeCategoryTask(id){
      const data = {
        id,
        title: this.taskTitle,
        CategoryId: this.categoryId,
      };
      this.$emit("editTask", data);
      this.cancelEditTask();
    },
    cancelEditTask() {
      this.defaultTaskCard = true;
      this.editTaskCard = false;
      this.changeCategoryTaskCard = false;
      this.categoryId = this.task.CategoryId;
    },
    deleteTask(id) {
      if (this.task.UserId === this.currentUser.id) {
        this.$emit("deleteTask", id);
      } else {
        this.$emit("unauthorizedAlert");
      }
      
    },
  },
  computed: {
  },
};
</script>

<style>
</style>