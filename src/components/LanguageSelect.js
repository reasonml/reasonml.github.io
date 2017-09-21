import React from "react"

const langs = [
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
  {code: 'fr', name: 'Français'},
];

const ru = {code: 'ru', name: 'русский'};

/* TODO ru only translates /guide... - this will help prevent 404s in short term
 * This should be replaces with a better mechanism. */
const getLangs = () => location.pathname.indexOf('/guide/') !== -1
  ? langs.concat(ru)
  : langs;

const frBase = 'https://reasonml-fr.surge.sh';
const defaultBase = location.hostname === 'localhost'
  ? location.protocol + '//' + location.host
  : 'https://reasonml.github.io';

const currentCode = () =>
  langs.map(l => l.code).find(s => s === location.pathname.split("/")[1]) ||
  (frBase.indexOf(location.hostname) !== -1
    ? langs[2] /* fr is default on surge */
    : langs[0] /* en is default on github */
  ).code;

const onChange = (e) => {
  const newLang = e.target.value;
  if (newLang !== currentCode()) {
    const path = location.pathname;
    const currentLang = getLangs().map(l => l.code).find(
      s => s === path.split('/')[1]
    );
    const currentLangRe = new RegExp(`\/${currentLang}(/|\$)`)
    if (newLang === 'en') {
      window.location = defaultBase + path.replace(currentLangRe, '/');
    } else if (newLang === 'fr') {
      window.location = frBase + path.replace(currentLangRe, '/');
    } else if (currentLang) {
      window.location = defaultBase + path.replace(
        currentLangRe,
        `/${newLang}/`
      );
    } else {
      window.location = defaultBase + '/' + newLang + path;
    }
  }
}

export default () => (
  <select css={styles.select} value={currentCode()} onChange={onChange}>
    {getLangs().map(({code, name}) =>
      <option key={code} value={code}>{name}</option>)}
  </select>
);

const styles = {
  select: {
    minWidth: 40,
  },
}
