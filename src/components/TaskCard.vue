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
              @click.prevent="showEditTask(task.id)"
              >✎</a
            >
            <!-- <a
              class="link-dark text-decoration-none"
              href="#"
              @click.prevent="changeCategoryTask(task.id)"
              >⇄</a
            > -->
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
                <select v-model="categoryId" class="form-select">
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{category.name}}
                      </option>
                    </select>
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
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task", "taskAuth", "categories"],
  data(){
    return {
      taskTitle: this.task.title,
      defaultTaskCard: true,
      editTaskCard: false,
      categoryId: this.task.CategoryId
    }
  },
  methods: {
    // checkAuthTask(id){
    //   this.$emit("checkAuthTask", id);
    // },
    showEditTask(id){
      this.taskTitle = this.task.title;
      this.defaultTaskCard = false;
      this.editTaskCard = true;
    },
    editTask(id){
      // console.log(this.taskTitle, id, this.task.CategoryId);
      const data = {
        id,
        title: this.taskTitle,
        CategoryId: this.categoryId
      }
      this.$emit("editTask", data);
      this.cancelEditTask();
    },
    cancelEditTask(){
      this.defaultTaskCard = true;
      this.editTaskCard = false;
      this.categoryId = this.task.CategoryId
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
  },
  computed: {
    // test(){
    //   if(taskAuth === 'authorized'){
    //     console.log("yes");
    //   }else {
    //     console.log("nope");
    //   }
    // }
  }
};
</script>

<style>
</style>