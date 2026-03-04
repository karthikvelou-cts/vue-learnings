<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            {{ msg }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="todotext"
              @keyup.enter="addTodo"
              label="Add a new task"
              variant="outlined"
              clearable
            >
              <template v-slot:append-inner>
                <v-btn @click="addTodo" color="primary" icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <v-list lines="one">
              <v-list-item v-for="(todo, index) in todos" :key="index" :title="todo">
                <template v-slot:append>
                  <v-btn @click="removeTodo(index)" color="grey-lighten-1" icon variant="text">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      todos: ["Learn JavaScript", "Learn Vue", "Build something awesome"],
      todotext: ''
    }
  },
  methods: {
    addTodo() {
      if (!this.todotext || !this.todotext.trim()) return;
      this.todos.push(this.todotext.trim());
      this.todotext = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Most styling is now handled by Vuetify, but you can add custom overrides here */
.v-card-title {
  justify-content: center;
}
</style>
