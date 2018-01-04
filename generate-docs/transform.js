const cheerio = require('cheerio');
const spawn = require('child_process').spawnSync;
const path = require('path');

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
  body.append('<link rel="stylesheet" href="/css/main.css" />');
  body.append(docContent);

  if (fileInfo.path.endsWith('index.html')) {
    $('h1').map((i, el) => {
      const $el = $(el);
      $el.attr('style', 'padding-left: 24px')
      return $el.text($el.text().replace('OCaml library', 'Reason API'));
    });

    $('.indexlist li a').attr('style', 'padding-left: 24px')
    $('.indextable tbody tr td a').attr('style', 'padding-left: 24px')
    $('br').remove();
  }

  if (path.basename(fileInfo.path).startsWith('type_')) {
    // turn module interface page into <pre> so code whitespace is preserved
    const typePageContent = $('code');
    typePageContent
      .parent()
      .html(`<pre>${typePageContent.html().replace('<br>', '\n')}</pre>`);
  }

  $('title').map((i, el) => {
    const $el = $(el);
    return $el.text($el.text().replace('OCaml library', 'Reason API'));
  });
  $('pre').map((i, el) => {
    const $el = $(el);
    $el.attr('id', $el.children()[0].attribs.id);
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
