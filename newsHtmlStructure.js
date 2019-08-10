//not currently in use
const htmlStructures = [
    {
        "name":"tribun-banjarmasin",
        "baseurl":"https://banjarmasin.tribunnews.com/topic/kriminalitas-banjarmasin",
        "dom":"li.p2030 > div >h3.f20.ln24.fbo>a",
        "domtitle":"h1#arttitle",
        "domimg":"div#artimg>div.pb20.ovh>div.ovh.imgfull_div>img",
        "domcontent":"div.side-article.txt-article>p",
        "component":["title","image","news"],
        "category":"kriminal",
        "page_param":"?&page=",
        "interval":1,
        "from":1,
        "to":1,
        "status":true
    },
    {
        "name":"kalsel-antara-news",
        "baseurl":"https://kalsel.antaranews.com/search/kriminal",
        "dom":"article.simple-post.simple-big.clearfix>div.simple-thumb>a",
        "domtitle":"div#print_content>header.post-header>h1.post-title",
        "domimg":"div#print_content>header.post-header>figure.image-overlay>img",
        "domcontent":"div.post-content.clearfix.print>p",
        "component":["title","image","news"],
        "category":"kriminal",
        "page_param":"/",
        "interval":1,
        "from":1,
        "to":5,
        "status":false
    },
    {
        "name":"randar-banjarmasin",
        "baseurl":"https://kalsel.prokal.co/rubrik/index/2-hukum-peristiwa",
        "dom":'div.media>div.media-body>a',
        "domtitle":'div[style="padding:10px 20px 10px 20px;"]>div[style="font-family: utopiareg;margin: 5px 0 15px 0;font-size:40px;line-height:1"]',
        "domimg":'div[style="padding:10px 20px 10px 20px;"]>img',
        "domcontent":"div#bodytext>p",
        "component":["title","image","news"],
        "category":"kriminal",
        "page_param":"/",
        "interval":11,
        "from":11,
        "to":11,
        "status":true
    }
];

module.exports = htmlStructures;