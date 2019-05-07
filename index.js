const rp = require('request-promise');
//to csv not use, cz scraped data aren't save to csv, but DB
const tocsv = require('objects-to-csv');
const cheerio = require('cheerio');
//config of request promise
rp.options.simple = false;

//base url where we should get list of post about criminals
// const baseURL = 'http://banjarmasin.tribunnews.com/topic/kriminalitas-banjarmasin';
// const baseURL = 'https://kalsel.antaranews.com/search/kriminal/1';
// const baseURL = 'https://klikkalsel.com/kategori/hukum-kriminal/';
const baseURL = 'https://kalselpos.com/hukum-kriminal/';

//retrive data from base url, and mapping it.
const getScrapingNews = async () => {
    const html = await rp(baseURL);
    // const businessMap = cheerio('li.p2030 > div >h3.f20.ln24.fbo>a', html).map(async (i, e) => {
    // const businessMap = cheerio('article.simple-post.simple-big.clearfix>div.simple-thumb>a', html).map(async (i, e) => {
    // const businessMap = cheerio('div.td_module_10.td_module_wrap.td-animation-stack> div.item-details > h3 > a', html).map(async (i, e) => {
    const businessMap = cheerio('header.entry-header>h2.entry-title>a', html).map(async (i, e) => {
        //get link from list of posts
        const link = e.attribs.href;
        console.log(link)
        //i have links,
        const innerHtml = await rp(link);
        //tribun
        // const titleArticle = cheerio('h1#arttitle', innerHtml).text();
        //kalsel antara news to buggy, not recomended. throw it to trash just like a shit
        // const titleArticle = cheerio('div#print_content>header.post-header>h1.post-title', innerHtml).text();
        // const innerImage = cheerio('div#print_content>header.post-header>figure.image-overlay>img',innerHtml).attr('src');
        //klik kalsel
        // const titleArticle = cheerio('header.td-post-title>h1.entry-title', innerHtml).text();
        // const innerImage = cheerio('div.td-post-content>div.td-post-featured-image>figure>a>img',innerHtml).attr('src');
        // const newsContent = cheerio('div.td-post-content>p',innerHtml).text();
        //kalselpos

        //get title, image and content each article.
        const titleArticle = cheerio('header.entry-header>h1.entry-title', innerHtml).text();
        const innerImage = cheerio('div.row>div.col-md-sgl-m>figure>img',innerHtml).attr('src');
        const newsContent = cheerio('div.row>div.col-md-sgl-m>div.row>div.col-md-content-s-c>div.entry-content.entry-content-single>p',innerHtml).text();

        //combine link, title, image and content in one object
        return {
            titleArticle,
            innerImage,
            newsContent,
            link,

        }
    }).get();
    //return promise of bussinessMap
    return Promise.all(businessMap);
};
//directly access from index.js
getScrapingNews()
    .then(result => {
        // const transformed = new tocsv(result);
        console.log(result);
        // return transformed.toDisk('./output.csv');
    })
    .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));

'use strict';
//export, to access from another method
module.exports = getScrapingNews;
