//not currently in use
const htmlStructures = [
    {
        "name":"tribun-banjarmasin",
        "baseurl":"http://banjarmasin.tribunnews.com/topic/kriminalitas-banjarmasin",
        "dom":"li.p2030 > div >h3.f20.ln24.fbo>a",
        "domtitle":"h1#arttitle",
        "domimg":"div#artimg>div.pb20.ovh>div.ovh.imgfull_div>img",
        "domcontent":"div.side-article.txt-article>p",
        "component":["title","image","news"],
        "category":"kriminal",
    },
    {
        "name":"kalsel-antara-news",
        "baseurl":"https://kalsel.antaranews.com/search/kriminal/1",
        "dom":"article.simple-post.simple-big.clearfix>div.simple-thumb>a",
        "domtitle":"div#print_content>header.post-header>h1.post-title",
        "domimg":"div#print_content>header.post-header>figure.image-overlay>img",
        "domcontent":"div.post-content.clearfix.print>p",
        "component":["title","image","news"],
        "category":"kriminal",
    },
    {
        "name":"klikkalsel",
        "baseurl":"https://klikkalsel.com/kategori/hukum-kriminal/",
        "dom":"div.td_module_10.td_module_wrap.td-animation-stack> div.item-details > h3 > a",
        "domtitle":"header.td-post-title>h1.entry-title",
        "domimg":"div.td-post-content>div.td-post-featured-image>figure>a>img",
        "domcontent":"div.td-post-content>p",
        "component":["title","image","news"],
        "category":"kriminal",
    },
    {
        "name":"kalselpos",
        "baseurl":"https://kalselpos.com/hukum-kriminal/",
        "dom":"header.entry-header>h2.entry-title>a",
        "domtitle":"header.entry-header>h1.entry-title",
        "domimg":"div.row>div.col-md-sgl-m>figure>img",
        "domcontent":"div.row>div.col-md-sgl-m>div.row>div.col-md-content-s-c>div.entry-content.entry-content-single>p",
        "component":["title","image","news"],
        "category":"kriminal",

    },
    {
        "name":"randar-banjarmasin",
        "baseurl":"http://kalsel.prokal.co/rubrik/index/2-hukum-peristiwa",
        "dom":'div.media>div.media-body>a',
        "domtitle":'div[style="padding:10px 20px 10px 20px;"]>div[style="font-family: utopiareg;margin: 5px 0 15px 0;font-size:40px;line-height:1"]',
        "domimg":'div[style="padding:10px 20px 10px 20px;"]>img',
        "domcontent":"div#bodytext>p",
        "component":["title","image","news"],
        "category":"kriminal",

    }
];

module.exports = htmlStructures;