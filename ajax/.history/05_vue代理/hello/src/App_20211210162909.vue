<template>
  <div>{{ mes }}</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mes: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:8080/students").then((res) => {
        console.log(res.data, "1111");
        this.mes = res.data;
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
