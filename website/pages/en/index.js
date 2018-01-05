const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require("../../server/translate.js").translate;

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
const code = "`";

const codeExample =`${pre}reason
type schoolPerson = Teacher | Director | Student(string);

let greeting = (stranger) =>
  switch stranger {
  | Teacher => "Hey professor!"
  | Director => "Hello director."
  | Student("Richard") => "Still here Ricky?"
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."
  };
${pre}`;

const quickStart = `${pre}sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
cd my-first-app
npm run start
${pre}

It runs in watch mode, so any changes to files will be picked up and compiled.

That's all! This compiles Reason to Javascript in the ${code}lib/js/${code} folder.

- Read more about how we compile to JavaScript through our partner project, [BuckleScript](http://bucklescript.github.io).

- Alternatively, **to start a [ReasonReact](https://reasonml.github.io/reason-react/docs/en/installation.html) app**, try ${code}bsb -init my-react-app -theme react${code}.

- Head over to [Editor Setup](/guide/editor-tools/global-installation) to get the Reason plugin for your favorite editor!`;

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
                "/try.html"
              }
            >
              <translate>Try Online</translate>
            </Button>
            <Button
              href={
                siteConfig.baseUrl +
                "docs/" +
                this.props.language +
                "/quickstart-javascript.html"
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
            Hello! This particular page hash has moved to <a id="redirectLink"/>.
            Please update the URLs to reflect it. Thanks!
          </div>
        </div>

        <div className="homeWrapperWrapper">
          <div className="wrapper homeWrapper">
            <div className="projectTitle">
              <img alt={siteConfig.title} src={`${siteConfig.baseUrl}img/reason_400.png`} />
            </div>

            <div className="homeWrapperInner">
              <div className="homeCodeSnippet">
                <MarkdownBlock>{codeExample}</MarkdownBlock>
              </div>
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
          <Container className="homeThreePoints" padding={["bottom"]}>
            <GridBlock
              align="center"
              contents={[
                {
                  title: "Types without hassle",
                  content: "Powerful, safe type inference means you rarely have to annotate types, but everything gets checked for you.",
                },
                {
                  title: "Easy JavaScript interop",
                  content: "Use packages from NPM/Yarn with minimum hassle, or even drop in a snippet of raw JavaScript while you're learning!",
                },
                {
                  title: "Flexible & Fun",
                  content: "Make websites, animations, games, servers, cli tools, and more! Take a look at these examples to get inspired.",
                },
              ]}
              layout="threeColumn"
            />
          </Container>

          <Container background="light" className="quickStartAndExamples homeCodeSnippet">
            <div>
              <h2>JavaScript Quick Start</h2>
              <MarkdownBlock>
                {quickStart}
              </MarkdownBlock>
            </div>
            <div>
              <h2>Examples</h2>
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
                layout="twoColumn"
              />
          </div>
          </Container>

          <div className="productShowcaseSection paddingBottom">
            <h2>
              <translate>Companies Using Reason</translate>
            </h2>
            <div className="logos">
              {showcase}
            </div>
            <div className="more-users">
              <a
                className="button"
                href={`${siteConfig.baseUrl}${this.props.language}/companies-using-reason.html`}
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
