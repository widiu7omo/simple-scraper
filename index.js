const rp = require('request-promise');
//to csv not use, cz scraped data aren't save to csv, but DB
const tocsv = require('objects-to-csv');
const cheerio = require('cheerio');
//config of request promise
rp.options.simple = false;
const newsData = require("./newsHtmlStructure");


//retrive data from base url, and mapping it.
const getScrapingNews = async (kindNews) => {
    console.log(kindNews);
    let dataSelector = {};
    newsData.forEach(news=>{
       if(news.name === kindNews){
           dataSelector = news;
       }
    });
    const html = await rp(dataSelector.baseurl);

        const businessMap = cheerio(dataSelector.dom, html).map(async (i, e) => {
        //get link from list of posts
        const link = e.attribs.href;

        const innerHtml = await rp(link);
        const titleArticle = cheerio(dataSelector.domtitle,innerHtml).text();
        const innerImage = cheerio(dataSelector.domimg,innerHtml).attr('src');
        const newsContent = cheerio(dataSelector.domcontent,innerHtml).text();

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
// getScrapingNews()
//     .then(result => {
//         // const transformed = new tocsv(result);
//         console.log(result);
//         // return transformed.toDisk('./output.csv');
//     })
//     .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));

'use strict';
//export, to access from another method
module.exports = getScrapingNews;
