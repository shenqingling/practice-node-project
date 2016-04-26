import marked from 'marked';
import Highlight from 'highlight.js';
import xss from 'xss';

export function redirectURL(url) {
  location = url;
}

marked.setOptions({
  highlight: function(code) {
    return Highlight.highlightAuto(code).value;
  }
});

// xss 默认将语法高亮去掉了，使用白名单解决
const xssOptions = {
  whiteList: Object.assign({}, xss.whiteList),
};
xss.whiteList.code = ['class'];
xss.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

export function renderMarkdown(text) {
  return myxss.process(marked(text));
}
