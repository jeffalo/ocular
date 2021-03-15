<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
:root {
  --brand: #0fbd8c;
  --background: white;
  --input-background: white;
  --input-border: #e0e0e0;
  --sidebar-background: #f2f2f2;
  --sidebar-border: #e0e0e0;
  --quote-background: #f7f7f7;
  --quote-border: #ccc;
  --table-stripe: #f2f2f2;
  --table-hover: #e6e6e6;
  --table-border: #ddd;
  --text: #575e75;
  --footer-text: #8d96b3;
}

.dark-mode {
  --brand: #075e46; /* CC5500 looks cool too (orange), FF6600 good too */
  --background: #111;
  --input-background: #141414;
  --input-border: #2c2c2c;
  --sidebar-background: #0a0a0a;
  --sidebar-border: #2c2c2c;
  --quote-background: #0a0a0a;
  --quote-border: #2c2c2c;
  --table-stripe: #252525;
  --table-hover: #2c2c2c;
  --table-border: #2c2c2c;
  --text: white;
  --footer-text: #a1a1a1;
}

.scratch-mode{
  --brand: #28a5da;
}

html,body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  background-color: var(--background);
  color: var(--text);
  padding: 0;
  margin: 0;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

h1, h2 {
  font: bold 2em;
  margin: 0 0 0.5em 0;
}

h2 {
  font-size: 1.5em;
}

p {
  margin: 0 0 1em 0;
}

a {
  color: #4d97ff;
  font-weight: bold;
  text-decoration: none;
}

.margined {
  margin-left: 282.600px;
  margin-right: 282.600px;
}

button {
  border-radius: 4px;
  border: none;
  background: #4d97ff;
  box-shadow: none;
  font-family: inherit;
  font-weight: bold;
  color: #fff;
  text-shadow: none;
  cursor: pointer;
  display: inline-block;
  line-height: 30px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

@media only screen and (max-width: 1100px) {
  .margined {
    /*background-color: lightblue;*/
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
