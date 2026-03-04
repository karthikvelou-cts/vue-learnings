<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            {{ msg }}
          </v-card-title>
          <v-form ref="form" @submit.prevent="addTodo">
            <v-card-text>
              <v-text-field
                v-model="todotext"
                :rules="todotextRules"
                label="Add a new task"
                variant="outlined"
                clearable
              >
                <template v-slot:append-inner>
                  <v-btn type="submit" color="primary" icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-text-field>

              <v-list lines="one">
                <v-list-item v-for="(todo, index) in todos" :key="index" :class="{ 'completed-task': todo.completed }">
                  <template v-slot:prepend>
                    <v-checkbox-btn v-model="todo.completed"></v-checkbox-btn>
                  </template>

                  <v-list-item-title>{{ todo.text }}</v-list-item-title>

                  <template v-slot:append>
                    <v-btn @click.stop="removeTodo(index)" color="red-lighten-1" icon variant="text">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-form>
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
      todos: [
        { text: "Learn JavaScript", completed: false },
        { text: "Learn Vue", completed: true },
        { text: "Build something awesome", completed: false }
      ],
      todotext: '',
      todotextRules: [
        v => !!(v && v.trim()) || 'Task text is required.',
        v => !(v && this.todos.some(todo => todo.text === v.trim())) || 'This task already exists.'
      ]
    }
  },
  methods: {
    async addTodo() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.todos.unshift({ text: this.todotext.trim(), completed: false });
        this.todotext = '';
        this.$refs.form.resetValidation();
      }
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
.completed-task .v-list-item-title {
  text-decoration: line-through;
  color: grey;
}
</style>
