const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require("../../server/translate.js").translate;
const translation = require('../../server/translation.js');

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper">
        <a className={`button ${this.props.className || ""}`} href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};
const pre = "```";

// fake, static, responsive refmt, lol. See reason.css homeCodeSnippet logic
const codeExampleSmallScreen = `${pre}reason
type schoolPerson =
  | Teacher
  | Director
  | Student(string);

let greeting = person =>
  switch (person) {
  | Teacher => "Hey Professor!"
  | Director => "Hello Director."
  | Student("Richard") =>
    "Still here Ricky?"
  | Student(anyOtherName) =>
    "Hey, " ++ anyOtherName ++ "."
  };
${pre}`;

const codeExampleLargeScreen = `${pre}reason
type schoolPerson = Teacher | Director | Student(string);

let greeting = person =>
  switch (person) {
  | Teacher => "Hey Professor!"
  | Director => "Hello Director."
  | Student("Richard") => "Still here Ricky?"
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."
  };
${pre}`;

const quickStart = `${pre}sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
cd my-first-app
npm run start
${pre}`;

class HomeSplash extends React.Component {
  render() {
    let promoSection =
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">
            <Button
              className="getStarted"
              href={
                siteConfig.baseUrl +
                this.props.language +
                "/try"
              }
            >
              <translate>Try Online</translate>
            </Button>
            <Button
              href={
                siteConfig.baseUrl +
                "docs/" +
                this.props.language +
                "/installation"
              }>
              Quick Start
            </Button>
          </div>
        </div>
      </div>;

    return (
      <div className="homeContainer">

        <div id="redirectBanner">
          <div>
            Hello! This particular page hash has moved to <a id="redirectLink" />.
            Please update the URLs to reflect it. Thanks!
          </div>
        </div>

        <div className="homeWrapperWrapper">
          <div className="wrapper homeWrapper">
            <div className="projectTitle">
              <img alt={siteConfig.title} src={`${siteConfig.baseUrl}img/reason.svg`} />
            </div>
            {/* Keep this section for future events! */}
            <div className="homeWrapperPromo">
              ReasonConf US 2019 is happening in Chicago on October 8th.<br/>
              <a href="https://www.reason-conf.us" target="_blank"> Get your tickets soon! </a>
            </div>
            <div className="homeWrapperInner">
              <div className="homeCodeSnippet">
                <MarkdownBlock>{codeExampleSmallScreen}</MarkdownBlock>
                <MarkdownBlock>{codeExampleLargeScreen}</MarkdownBlock>
              </div>
              <div className="homeTagLine">
                {translation[this.props.language]['localized-strings'].tagline}
              </div>
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
    let language = this.props.language || "en";
    const showcase = siteConfig.users
      .map(user => {
        return (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={`${siteConfig.baseUrl}${user.image}`} title={user.caption} />
          </a>
        );
      });

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Container>
            <GridBlock
              align="center"
              contents={[
                {
                  title: <translate>Types without hassle</translate>,
                  content: <translate>Powerful, safe type inference means you rarely have to annotate types, but everything gets checked for you.</translate>,
                },
                {
                  title: <translate>Easy JavaScript interop</translate>,
                  content: <translate>Use packages from NPM/Yarn with minimum hassle, or even drop in a snippet of raw JavaScript while you're learning!</translate>,
                },
                {
                  title: <translate>Flexible & Fun</translate>,
                  content: <translate>Make websites, animations, games, servers, cli tools, and more! Take a look at these examples to get inspired.</translate>,
                },
              ]}
              layout="threeColumn"
            />
          </Container>

          <Container background="light" className="quickStartAndExamples homeCodeSnippet">
            <div>
              <h2><translate>QuickStart</translate></h2>
              <MarkdownBlock>
                {quickStart}
              </MarkdownBlock>
              <p>
                <translate>It runs in watch mode, so any changes to files will be picked up and compiled.</translate>
                <a href="https://reasonml.github.io/reason-react/docs/en/installation"> <translate>Read more here!</translate></a>
              </p>
            </div>
            <div>
              <h2><translate>Examples</translate></h2>
              <GridBlock
                className="examples"
                align="center"
                contents={siteConfig.examples.map(example => ({
                  title: example.name,
                  image: `${siteConfig.baseUrl}${example.image}`,
                  imageLink: example.link,
                  imageAlign: "top",
                  content: "",
                }))}
              />
            </div>
          </Container>

          <div className="productShowcaseSection paddingBottom">
            <h2>
              <translate>Users of Reason</translate>
            </h2>
            <div className="logos">
              {showcase}
            </div>
            <div className="more-users">
              <a
                className="button"
                href={`${siteConfig.baseUrl}${this.props.language}/users-of-reason`}
              >
                <translate>See Full List</translate>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
