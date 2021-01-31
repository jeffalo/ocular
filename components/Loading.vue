<template>
  <div>
    <h1><div class="lds-hourglass"></div>loading...</h1>
    <i>did you know: {{ fact }}</i>
  </div>
</template>

<script>
export default {
  data() {
    const facts= [
        "gobo might have been the mascot for scratch",
        "the scratch team owns the domain scratch.team",
        'this is the third "did you know" message i have written',
        "there was a small window of time where you could backpack scratchblocks from the forums",
        'ocular was originally called "Jeffalo Post Viewer"',
        "according to all known laws of aviation there is no way there is no way a bee should be able to fly",
        "only cool people have an ocular statuses?",
        'the word "notch" was originally "oche" but people misheard it when others said "an oche"',
        "the scratch team can see your gender",
        'you cannot sign up to scratch with the name "qnb02mclepghwic9"',
        "scratch projects are never deleted unless specifically you ask the scratch team to",
        "scrath has a bug bounty program",
        "it is currently 9:51 while i write this",
        "scratch owns the domain scratch.pizza",
        "scratch owns the domain scratch.love",
        "We are experiencing a disruption with email delivery. If you are not receiving emails from us, please try after 8am EST.",
        "backpack.scratch.mit.edu has a funny ghost",
        "download.scratch.mit.edu says Scratch On!",
        "downloads.scratch.mit.edu has a one of a kind error page",
        "downloads.scratch.ly just says No",
        "projects.scratch.mit.edu has an easter egg in the HTTP response headers",
        "during scratch 2's development there was a built in scrolling system for projects",
        "scratch has a discussion forum",
        "archbtw uses arch btw",
        'scratch has some code for an unused "disable studio notifications" button',
        "each of gobo's friends names come from the metric prefix for powers of 10"
      ]
    return {
      fact: facts[Math.floor(Math.random() * facts.length)]
    };
  },
};
</script>

<style scoped>
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 35px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 15px solid #0fbd8c;
  border-color: #0fbd8c transparent #0fbd8c transparent;
  animation: lds-hourglass 1.25s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>