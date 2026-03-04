<template>
  <div id="app">
    <header class="topbar">
      <h1><router-link to="/">Sports Quiz</router-link></h1>
      <!-- <nav>
        <router-link to="/quiz">Others Quiz</router-link>
      </nav> -->
    </header>

    <main class="page">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #f4f7f5;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #42b983;
  color: #fff;
}

.topbar h1 {
  margin: 0;
  font-size: 20px;
}

.topbar a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.page {
  padding: 24px;
}
</style>
