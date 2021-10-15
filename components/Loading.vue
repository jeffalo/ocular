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
        "each of gobo's friends names come from the metric prefix for powers of 10",
        "today is probably someone's birthday on scratch",
        "ocular",
        "ocular is currently loading",
        "the first scratch project was id 104, everything with a lower id was added later",
        "jeffalo's real name is not actually jeff or anything similar",
        "this isnt a did you know message",
        "i am running out of trivia",
        "i want you to see za-chary's 5000 Followers Podcast",
        "the scratch wiki has a wacky domain name",
        "the scratch team's admin panel may have at some point had a template specifically for fnaf project alerts",
        "jeffalo did not write this message",
        "scratchdb might stand for scratch donut buffet",
        "jeffalo starts with a letter",
        "ocular statuses are displayed on a variety of websites",
        "any scratch url starting https://scratch.mit.edu/go leads to a 403",
        'you can no longer sign up to scratch with the name "jeffalo"',
        "when scratchdb is down, ocular may not work",
        "you are reading this, or maybe not",
        "the",
        "ocular uses vue",
        "no",
        "the word ocular has three vowels and three consonants"
        "ocular is 1 year old!",
        "ocular-svelte is coming soon!",
        "scratch 3 released on january 2nd, 2019",
        "scratch 2 released on may 9th, 2013",
        "scratch is partially open source"
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
  border: 15px solid var(--brand);
  border-color: var(--brand) transparent var(--brand) transparent;
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
