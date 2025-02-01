<template>
  <div class="content" v-html="blockifiedContent">
  </div>
</template>

<script>
export default {
  props: ['content'],
  computed: {
    blockifiedContent() {
      // adapted from https://github.com/scratchblocks/scratchblocks/blob/master/index.js
      let content = this.content;
      let options = {
        style: "scratch3",
        inline: false,
        languages: ["en"],

        read: scratchblocks.read, // function(el, options) => code
        parse: scratchblocks.parse, // function(code, options) => doc
        render: scratchblocks.render, // function(doc) => svg
      };
      const parser = new DOMParser();

      const doc = parser.parseFromString(content, "text/html");

      let results = [].slice.apply(
        doc.querySelectorAll("pre.blocks:not(.scratchblockrendered)")
      );
      results.forEach(function (el) {
        var code = options.read(el, options);

        var parsed = options.parse(code, options);

        var svg = options.render(parsed, options);

        var container = doc.createElement("div");
        container.className = "scratchblocks";
        container.appendChild(svg);
        el.innerHTML = "";
        el.appendChild(container);
      });
      return doc.documentElement.innerHTML;
    },
  },
};
</script>

<style scoped>
.content >>> img {
  max-width: 100%;
  max-height: 100%;
}

.content >>> blockquote {
  margin: 12px 0;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
}

.content >>> .code {
  margin: 12px 0;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
  overflow: auto;
  max-height: 450px;
}

.content >>> .code pre {
  margin: 0;
}

.content >>> .bb-quote-author {
  color: var(--text-color);
  font-weight: bold;
}

.content >>> .bb-italic {
  font-style: italic;
}

.content >>> .bb-bold {
  font-weight: bold;
}

.content >>> .bb-small {
  font-size: 10px;
}

.content >>> .bb-big {
  font-size: 17px;
}

.content >>> .bb-strikethrough {
  text-decoration: line-through;
}

.content >>> .bb-underline {
  text-decoration: underline;
}
</style>


<style scoped>
/* code highlighting i am so sorry */
.content >>> .hll {
  background-color: #ffffcc;
}
.content >>> .c {
  color: #408080;
  font-style: italic;
} /* Comment */
.content >>> .content >>> .err {
  border: 1px solid #ff0000;
} /* Error */
.content >>> .k {
  color: #008000;
  font-weight: bold;
} /* Keyword */
.content >>> .o {
  color: #666666;
} /* Operator */
.content >>> .cm {
  color: #408080;
  font-style: italic;
} /* Comment.Multiline */
.content >>> .cp {
  color: #bc7a00;
} /* Comment.Preproc */
.content >>> .c1 {
  color: #408080;
  font-style: italic;
} /* Comment.Single */
.content >>> .cs {
  color: #408080;
  font-style: italic;
} /* Comment.Special */
.content >>> .gd {
  color: #a00000;
} /* Generic.Deleted */
.content >>> .ge {
  font-style: italic;
} /* Generic.Emph */
.content >>> .gr {
  color: #ff0000;
} /* Generic.Error */
.content >>> .gh {
  color: #000080;
  font-weight: bold;
} /* Generic.Heading */
.content >>> .gi {
  color: #00a000;
} /* Generic.Inserted */
.content >>> .go {
  color: #808080;
} /* Generic.Output */
.content >>> .gp {
  color: #000080;
  font-weight: bold;
} /* Generic.Prompt */
.content >>> .gs {
  font-weight: bold;
} /* Generic.Strong */
.content >>> .gu {
  color: #800080;
  font-weight: bold;
} /* Generic.Subheading */
.content >>> .gt {
  color: #0040d0;
} /* Generic.Traceback */
.content >>> .kc {
  color: #008000;
  font-weight: bold;
} /* Keyword.Constant */
.content >>> .kd {
  color: #008000;
  font-weight: bold;
} /* Keyword.Declaration */
.content >>> .kn {
  color: #008000;
  font-weight: bold;
} /* Keyword.Namespace */
.content >>> .kp {
  color: #008000;
} /* Keyword.Pseudo */
.content >>> .kr {
  color: #008000;
  font-weight: bold;
} /* Keyword.Reserved */
.content >>> .kt {
  color: #b00040;
} /* Keyword.Type */
.content >>> .m {
  color: #666666;
} /* Literal.Number */
.content >>> .s {
  color: #ba2121;
} /* Literal.String */
.content >>> .na {
  color: #7d9029;
} /* Name.Attribute */
.content >>> .nb {
  color: #008000;
} /* Name.Builtin */
.content >>> .nc {
  color: #0000ff;
  font-weight: bold;
} /* Name.Class */
.content >>> .no {
  color: #880000;
} /* Name.Constant */
.content >>> .nd {
  color: #aa22ff;
} /* Name.Decorator */
.content >>> .ni {
  color: #999999;
  font-weight: bold;
} /* Name.Entity */
.content >>> .ne {
  color: #d2413a;
  font-weight: bold;
} /* Name.Exception */
.content >>> .nf {
  color: #0000ff;
} /* Name.Function */
.content >>> .nl {
  color: #a0a000;
} /* Name.Label */
.content >>> .nn {
  color: #0000ff;
  font-weight: bold;
} /* Name.Namespace */
.content >>> .nt {
  color: #008000;
  font-weight: bold;
} /* Name.Tag */
.content >>> .nv {
  color: #19177c;
} /* Name.Variable */
.content >>> .ow {
  color: #aa22ff;
  font-weight: bold;
} /* Operator.Word */
.content >>> .w {
  color: #bbbbbb;
} /* Text.Whitespace */
.content >>> .mf {
  color: #666666;
} /* Literal.Number.Float */
.content >>> .mh {
  color: #666666;
} /* Literal.Number.Hex */
.content >>> .mi {
  color: #666666;
} /* Literal.Number.Integer */
.content >>> .mo {
  color: #666666;
} /* Literal.Number.Oct */
.content >>> .sb {
  color: #ba2121;
} /* Literal.String.Backtick */
.content >>> .sc {
  color: #ba2121;
} /* Literal.String.Char */
.content >>> .sd {
  color: #ba2121;
  font-style: italic;
} /* Literal.String.Doc */
.content >>> .s2 {
  color: #ba2121;
} /* Literal.String.Double */
.content >>> .se {
  color: #bb6622;
  font-weight: bold;
} /* Literal.String.Escape */
.content >>> .sh {
  color: #ba2121;
} /* Literal.String.Heredoc */
.content >>> .si {
  color: #bb6688;
  font-weight: bold;
} /* Literal.String.Interpol */
.content >>> .sx {
  color: #008000;
} /* Literal.String.Other */
.content >>> .sr {
  color: #bb6688;
} /* Literal.String.Regex */
.content >>> .s1 {
  color: #ba2121;
} /* Literal.String.Single */
.content >>> .ss {
  color: #19177c;
} /* Literal.String.Symbol */
.content >>> .bp {
  color: #008000;
} /* Name.Builtin.Pseudo */
.content >>> .vc {
  color: #19177c;
} /* Name.Variable.Class */
.content >>> .vg {
  color: #19177c;
} /* Name.Variable.Global */
.content >>> .vi {
  color: #19177c;
} /* Name.Variable.Instance */
.content >>> .il {
  color: #666666;
} /* Literal.Number.Integer.Long */
</style>
