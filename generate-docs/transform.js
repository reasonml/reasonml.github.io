const cheerio = require('cheerio');
const spawn = require('child_process').spawnSync;

function convert(input, isInterface) {
  const result = spawn(
    'refmt',
    ['--interface=' + JSON.stringify(isInterface), '--parse=ml', '--print=re'],
    {input: input}
  );
  if (result.status != 0) {
    return input;
  }

  return result.stdout.toString();
}

module.exports = function(fileInfo, api, options) {
  const $ = cheerio.load(fileInfo.source);
  const body = $('body');
  const bodyContent = body.html();
  body.empty();
  const docContent = $('<div class="ocamldoc"></div>');
  docContent.append(bodyContent);
  body.append(docContent);

  if (fileInfo.path.endsWith('index.html')) {
    $('h1').map((i, el) => {
      const $el = $(el);
      return $el.text($el.text().replace('OCaml library', 'Reason API'));
    });
    $('br').remove();
  }

  $('title').map((i, el) => {
    const $el = $(el);
    return $el.text($el.text().replace('OCaml library', 'Reason API'));
  });
  $('pre').map((i, el) => {
    const $el = $(el);
    const input = $el.text();
    const transformed = convert(input, true);
    const keywordMatch = transformed.match(/^(module|let|type|exception)/);
    if (keywordMatch) {
      const keyword = keywordMatch[1];
      const remainder = transformed.slice(keywordMatch[0].length);
      $el.text(remainder);
      $el.prepend(`<span class="keyword">${keyword}</span>`);
      return $el;
    }
    return $el.text(transformed);
  });
  $('code').map((i, el) => {
    const $el = $(el);
    const input = $el.text();
    const transformed = convert(input, true);
    return $el.text(transformed);
  });
  return body.html();
};
