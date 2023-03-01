<template>
  <v-app>
    <v-main class="main">
      <Form />
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import Form from "./components/Form";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>
<style scoped>
.main {
  background-color: #f4f5f7;
}
</style>
