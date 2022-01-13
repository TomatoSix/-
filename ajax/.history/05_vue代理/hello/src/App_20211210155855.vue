<template><div></div></template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mes: "",
    };
  },
  methods: {
    getData() {
      axiaxiosos.get("http://127.0.0.1:5000/students").then((res) => {
        console.log(res, "1111");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
