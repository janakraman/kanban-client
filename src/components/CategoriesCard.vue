<template>
  <div class="col rounded py-4 px-2 mx-2" :class="this.colorClass">
    <h6 class="text-center mb-3">{{ category.name }}</h6>

    <div>
      <task-card v-for="task in tasks" 
    :key="task.id"
    :task="task"
    :currentUser="currentUser"
    :categories="categories"
    @unauthorizedAlert="unauthorizedAlert"
    @editTask="editTask"
    @deleteTask="deleteTask"
    ></task-card>
    </div>

    <!-- <div class="card my-1 p-0"> -->
    <div class="d-flex justify-content-center">
      <button
        type="submit"
        class="btn btn-outline-light w-100"
        @click.prevent="addTaskForm()"
        v-if="showAddTaskBtn"
      >
        +
      </button>
    </div>
    <!-- </div> -->

    <div class="card" v-if="showAddTaskForm">
      <div class="card-body shadow">
        <form>
          <div class="container d-flex justify-content-start p-0">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control flex-grow-1"
                  v-model="newTask"
                  id="newTask"
                />
              </div>
              <div class="col-2 p-0">
                <button
                  type="submit"
                  class="btn btn-outline-dark"
                  @click.prevent="addNewTask()"
                >
                  +
                </button>
              </div>
              <div class="col-2 p-0">
                <button
                  type="submit"
                  class="btn btn-outline-danger"
                  @click.prevent="cancelAddTask"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";

export default {
  name: "CategoriesCard",
  data() {
    return {
      id: this.category.id,
      showAddTaskBtn: true,
      showAddTaskForm: false,
      newTask: "",
    };
  },
  components: {
    TaskCard,
  },
  props: ["category", "tasks", "currentUser", "categories", "categoryId"],
  methods: {
    addTaskForm() {
      this.showAddTaskBtn = false;
      this.showAddTaskForm = true;
    },
    addNewTask() {
      console.log(this.newTask);
      const data = {
        title: this.newTask,
        CategoryId: this.category.id
      }
      this.$emit("addNewTask", data);
      this.cancelAddTask();
    },
    cancelAddTask() {
      this.showAddTaskBtn = true;
      this.showAddTaskForm = false;
      this.newTask = "";
    },
    unauthorizedAlert(){
      this.$emit("unauthorizedAlert")
    },
    editTask(data){
      this.$emit("editTask", data)
    },
    checkAuthTask(id){
      this.$emit("checkAuthTask", id)
    },
    deleteTask(id){
      this.$emit("deleteTask", id)
    }

  },
  computed:{
    colorClass(){
      return "custom-color-"+ this.categoryId;
    }
  }
};
</script>

<style>
</style>