<template>
<div class="gradient">
    <div class="header">
      <img style="position:absolute;left:10px;top:10px;" src="https://psv4.vkuseraudio.net/s/v1/d/ZOjISoBZgYhf9zOcQaGBsq38YMZwUAFBu2z2BQ147CgUP2y5ynVO_Bdt19mSUYq1aqmPEsH2f-x5vchoWw0FU4yIPNyOXu9PUv8-UsQdz8dFf0R3OWS3eg/logo.png">
      <div class="pop">
        <img class="popp" src="https://sun9-37.userapi.com/impg/CV6JO9-Lz7Ne74SVWBiwpiyCFVU4NbEJjTx9cA/_C7pjA1SvWY.jpg?size=47x51&quality=96&sign=f3a7128fd66eb2deabc7b3ddb1886a39&type=album">
        <div class="popf">Популярные уроки</div>
      </div>
      <div class="all">
        <img class="allp" src="https://sun9-64.userapi.com/impg/4l42qxR4_YYC9znDYQBUbnhpenTQfpTeyMX6aA/rOgEu_e589c.jpg?size=47x51&quality=96&sign=b422c1d50d78e85aee7a10b1dd4965ea&type=album">
        <div class="allf">Все уроки</div>
      </div>
      <div class="fav">
        <img class="favp" src="https://sun9-80.userapi.com/impg/N7Ive0haac7j7Zp9S6c1FlLMf008IKlc4w8eWA/2oBp_cxHPkQ.jpg?size=47x51&quality=96&sign=00931bda687dab269c362c45421b83b8&type=album">
        <div class="favf">Избранные уроки</div>
      </div>
    </div>

    <div class="lesson">
      <div v-if="lessonData" class="lesson_content">  
        <h1>{{ lessonData.name }}</h1>
        <a>{{ lessonData.text }}</a> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: { type: String }
  },
  data() {
    return {
      lessonData: null
    };
  },
  mounted() {
    this.loadLesson();
  },
  methods: {
    loadLesson() {
      fetch(`http://localhost:5000/lessons/${this.lesson}`, {
        headers: {
          Authorization: "a"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.lessonData = data;
        })
        .catch(error => {
          console.error("Error fetching uroks:", error);
        });
    }
  }
}
</script>

<style src="./styles.css" scoped></style>