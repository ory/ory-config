<template>
  <div id="app">
    <section class="hero">
      <div class="title-container">
        <div class="container">
          <div id="nav">
            <router-link to="/hydra">Hydra</router-link>
            |
            <router-link to="/kratos">Kratos</router-link>
            |
            <router-link to="/keto">Keto</router-link>
            |
            <router-link to="/oathkeeper">Oathkeeper</router-link>
            |
            <router-link to="/about">About</router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
