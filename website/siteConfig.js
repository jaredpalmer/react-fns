/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const siteConfig = {
  title: 'react-fns',
  tagline: 'React Components for common Web APIs',
  url: 'https://react-fns.netlify.com',
  editUrl: 'https://github.com/jaredpalmer/react-fns/tree/source/docs/',
  translationRecruitingLink: 'https://crowdin.com/project/react-fns-website',
  sourceCodeButton: null,
  baseUrl: '/',
  projectName: '',
  headerLinks: [
    { doc: 'installation', label: 'Docs' },

    { languages: true },
    { search: true },
    { href: 'https://github.com/jaredpalmer/react-fns', label: 'GitHub' },
  ],
  headerIcon: 'img/reason-react-white.svg',
  // footerIcon: "img/logo.svg",
  favicon: 'img/reason-react-red.svg',
  /* colors for website */
  colors: {
    primaryColor: '#05a',
    secondaryColor: '#05a',
    codeColor:
      'rgba(0, 85, 170, 0.03)' /* primaryColor in rgba form, with 0.03 alpha */,
  },
  highlight: {
    theme: 'github',
  },
  algolia: {
    apiKey: '2d4ae48c321d57af794830e115f45864',
    indexName: 'esy',
  },
  markdownPlugins: [
    // ignore `<!-- prettier-ignore -->` before passing into Docusaurus to avoid mis-parsing (#3322)
    md => {
      md.block.ruler.before(
        'htmlblock',
        'prettierignore',
        (state, startLine) => {
          const pos = state.bMarks[startLine];
          const max = state.eMarks[startLine];
          if (/<!-- prettier-ignore -->/.test(state.src.slice(pos, max))) {
            state.line += 1;
            return true;
          }
          return false;
        }
      );
    },
  ],
};

module.exports = siteConfig;
