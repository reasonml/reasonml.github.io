const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const translate = require("../../server/translate.js").translate;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map(user => {
      return (
        <a href={user.infoLink}>
          <img
            src={`${siteConfig.baseUrl}${user.image}`}
            title={user.caption}
          />
        </a>
      );
    });

    return (
      <div className="mainContainer">
        <Container>
          <div className="showcaseSection">
            <div className="prose">
              <h1>
                <translate>Companies Using Reason</translate>
              </h1>
              <p>
                <translate>Here are some of the companies successfully using Reason and BuckleScript in production, today. Add yours</translate>
                <a href="https://github.com/reasonml/reasonml.github.io/blob/source/website/siteconfig.js">&nbsp;<translate>here</translate></a>!&nbsp;
                <translate>(SVG logo preferred)</translate>
              </p>
            </div>
            <div className="logos">
              {showcase}
            </div>
            <a
              href="https://github.com/reasonml/reason-react/edit/master/website/siteConfig.js"
              className="button addCompanyButton"
            >
              Add yours
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
