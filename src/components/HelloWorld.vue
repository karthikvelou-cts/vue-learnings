<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">Delete</button>
      </li>
    </ul>
    <input v-model="todotext" @keyup.enter="addTodo" type="text" placeholder="Add a new task">
    <button @click="addTodo">Add</button>
  </div>
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
      if (!this.todotext) return;
      this.todos.push(this.todotext);
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>
