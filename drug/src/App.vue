<template>
  <div>
    <SignIn @enter="step = 'Mode-Prescription'" v-if="step === 'Mode-SignIn'" />
    <SignUp @login="step = 'Mode-SignIn'" v-if="step === 'Mode-SignUp'" />
    <Prescription v-if="step === 'Mode-Prescription'" @view-lesson="showLesson" />
    <Lesson v-if="step == 'Mode-View-Lesson'" :lesson="lesson" />
  </div>
</template>

<script>
import SignUp from "./signup.vue";
import SignIn from "./signin.vue";
import Prescription from "./prescription.vue";
import Lesson from './lesson.vue'

export default {
  components: { SignIn, SignUp, Prescription, Lesson },
  props: ["lesson"],
  data() {
    return {
      step: "Mode-SignUp",
      lesson: 0
    };
  },
  beforeMount() {
        const parts = location.pathname.split("/");
        if (parts[1] == "lesson") {
            this.lesson = parts[2];
            this.step = "Mode-View-Lesson";
        } else {
            this.step = "Mode-SignUp";
        }
    },
  methods: {
    handleEnter() {
      this.step = "Mode-Prescription";
    }
  },
    showLesson(id) {
    this.lesson = id;
    this.step = "Mode-View-Lesson";
  }

};
</script>

<style src="./styles.css" scoped></style>
