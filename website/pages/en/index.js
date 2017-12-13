const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require('../../server/translate.js').translate;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper">
        <a
          className={`button ${this.props.className || ''}`}
          href={this.props.href}
          target={this.props.target}
        >
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};
const pre = '```';
const code = '`';

const quickStart = `${pre}bash
#Install esy
npm install -g esy

# Clone the example
git clone git@github.com:esy-ocaml/esy-ocaml-project.git
cd esy-ocaml-project

# Install project's dependencies:
esy install

# Perform an initial build:
esy build
${pre}`;

class HomeSplash extends React.Component {
  render() {
    let promoSection = (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">
            <Button
              className="getStarted"
              href={
                siteConfig.baseUrl +
                'docs/' +
                this.props.language +
                '/installation.html'
              }
            >
              <translate>Get Started</translate>
            </Button>
            <Button href="https://github.com/jaredpalmer/react-fns">
              Source Code
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="homeContainer">
        <div className="homeWrapperWrapper">
          <div className="wrapper homeWrapper">
            <div className="projectTitle">{siteConfig.title}</div>

            <div className="homeWrapperInner">
              <div className="homeTagLine">{siteConfig.tagline}</div>
            </div>

            {promoSection}
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    let language = this.props.language || 'en';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Container className="homeThreePoints" padding={['bottom']}>
            <GridBlock
              align="center"
              contents={[
                {
                  title: 'Declarative',
                  content:
                    'Replace imperative Web API code with React components',
                },
                {
                  title: 'Flexible',
                  content: 'Use render props and/or higher order components',
                },
                {
                  title: 'Reusable',
                  content: 'Keep code consistent across your application',
                },
              ]}
              layout="threeColumn"
            />
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Index;
