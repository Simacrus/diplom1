

<template>
<div class="gradient">
    <div class="header">
        <img style="position:absolute;left:10px;top:10px;" src="https://psv4.vkuseraudio.net/s/v1/d/ZOjISoBZgYhf9zOcQaGBsq38YMZwUAFBu2z2BQ147CgUP2y5ynVO_Bdt19mSUYq1aqmPEsH2f-x5vchoWw0FU4yIPNyOXu9PUv8-UsQdz8dFf0R3OWS3eg/logo.png">
    </div>

<form class="form">
    <div class="col-sm-3 mx-auto mt-5">

        <div class="mb-3">
            <input v-model="FirstName" type="FirstName" class="form-control" id="FirstName" placeholder="Имя" aria-describedby="FirstName">
        </div>

        <div class="mb-3">
            <input v-model="LastName" type="LastName" class="form-control" id="LastName" placeholder="Фамилия" aria-describedby="LastNmae">
        </div>

        <div class="mb-3">
            <input v-model="login" type="login" class="form-control" id="login" placeholder="Логин" aria-describedby="login">
        </div>

        <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Пароль" id="password">
        </div>

        <button @click="SignUp" type="button" class="btn btn-primary" style="position: relative; left: 50%;transform: translate(-50%, 0);">Зарегистрироваться</button>
        <p @click="$emit('login')" class="about">Есть аккаунт? Войдите!</p>
       
    </div>
</form>
</div>
</template>

<script>
    // let reg = /[Яа=яЁё]/g;
    // login.oninput = function(){
    //     this.value = this.value.replace(reg, '');
    // }
    export default {
        data() {
            return {
                FirstName: '',
                LastName: '',
                login: '',
                password: ''
            }
        },
        emits: ['login'],
        methods: {
            SignUp() {
                alert("Registered");
                const res = fetch('http://localhost:5000/registration', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                    body: JSON.stringify({
                        FirstName: this.FirstName,
                        LastName: this.LastName,
                        login: this.login,
                        password: this.password

                    })
                })
                res.then().catch()
                console.log(res)

            }
        }
    }


    
</script>

<style src="./styles.css" scoped></style>