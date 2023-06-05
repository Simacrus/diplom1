<template>
  <div class="gradient">
    <div class="header">
      <img style="position:absolute;left:10px;top:10px;" src="https://psv4.vkuseraudio.net/s/v1/d/ZOjISoBZgYhf9zOcQaGBsq38YMZwUAFBu2z2BQ147CgUP2y5ynVO_Bdt19mSUYq1aqmPEsH2f-x5vchoWw0FU4yIPNyOXu9PUv8-UsQdz8dFf0R3OWS3eg/logo.png">
    </div>
    <form class="form">
      <div class="col-sm-3 mx-auto mt-5">
        <div class="mb-3">
          <input v-model="login" type="login" class="form-control" id="login" placeholder="Логин" aria-describedby="login">
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Пароль" id="password">
        </div>
        <button @click="signIn" type="button" class="btn btn-primary">Войти</button>
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      error: ""
    };
  },
  methods: {
    signIn() {
      const currentObject = this;
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      })
        .then(res => res.json())
        .then(function(res) {
          if (res.error) {
            currentObject.error = res.error;
          } else {
            localStorage.setItem("token", res.token_user);
            currentObject.$emit("enter"); // Вызовите событие enter, чтобы родительский компонент обработал перенаправление
          }
        })
        .catch(function(error) {
          console.error("An error occurred:", error);
          currentObject.error = "Ошибка авторизации";
        });
    }
  }
};
</script>

<style src="./styles.css" scoped></style>
