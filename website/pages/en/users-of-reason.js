const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const translate = require("../../server/translate.js").translate;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map(user => {
      return (
        <a href={user.infoLink} key={user.infoLink}>
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
                <translate>Users of Reason</translate>
              </h1>
              <p>
                <translate>Here are some of the folks successfully using Reason and BuckleScript in production, today!</translate>
              </p>
            <a href="https://github.com/reasonml/reasonml.github.io/blob/source/website/siteConfig.js" className="button addCompanyButton">
              <translate>Add yours (SVG logo preferred)</translate>
            </a>
            </div>
            <div className="logos">
              {showcase}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
