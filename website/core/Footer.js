/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const React = require("react");

const highlighterCode = `
function fn() {
  Array.prototype.forEach.call(
    document.querySelectorAll("pre"),
    hljs.highlightBlock
  );
};
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}
`;

class Footer extends React.Component {
  render() {
    return (
      <span>
        <script src={this.props.config.baseUrl + 'js/redirectBlog.js'}></script>
        <script src={this.props.config.baseUrl + 'js/pjax-api.js'}></script>
        <script dangerouslySetInnerHTML={{__html: `window.foo = new Pjax({
          areas: [
            // try to use the first query.
            '.mainContainer, .docsNavContainer .toc .navWrapper',
            // fallback
            'body'
          ],
          link: '.docsNavContainer:not(.docsSliderActive) a',
          update: {
            script: false,
          }
        });
        var languagesMenuItemCopy = document.getElementById("languages-menu");
        languagesMenuItemCopy.addEventListener("click", function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        });`}}></script>
      </span>
    );
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            <img
              src={this.props.config.baseUrl + this.props.config.footerIcon}
              alt={this.props.config.title}
              width="66"
              height="58"
            />
          </a>
          <div>
            <h5>Docs</h5>
            <a
              href={
                this.props.config.baseUrl +
                "docs/" +
                this.props.language +
                "/getting-started.html"
              }
            >
              Getting Started
            </a>
            <a
              href={
                this.props.config.baseUrl +
                "docs/" +
                this.props.language +
                "/simple.html"
              }
            >
              Examples
            </a>
            <a
              href={
                this.props.config.baseUrl +
                "docs/" +
                this.props.language +
                "/common-errors.html"
              }
            >
              FAQ
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://discord.gg/reasonml" target="_blank">
              Discord
            </a>
            <a href="https://twitter.com/reasonml" target="_blank">
              Twitter
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/reason-react"
              target="_blank"
            >
              Stack Overflow
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + "blog"}>Blog</a>
            <a href="https://github.com/reasonml/reason-react">GitHub</a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
