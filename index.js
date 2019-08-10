const rp = require('request-promise');
//to csv not use, cz scraped data aren't save to csv, but DB
const tocsv = require('objects-to-csv');
const cheerio = require('cheerio');
//config of request promise
rp.options.simple = false;
const newsData = require("./newsHtmlStructure");

//retrive data from base url, and mapping it.
const getScrapingNews = async (kindNews) => {
    let dataSelector = {};
    let i;
    let pages = new Array;
    let allNews = new Array;
    newsData.forEach(news=>{
       if(news.name === kindNews){
           dataSelector = news;
           //get few pages
           for(i = news.to;i >= news.from; i-=news.interval){
               pages.push(i);
               console.log(i);
           }
       }
    });
    
    // console.log(pages);
    for(let i = 0;i<pages.length;i++){
        let url = dataSelector.baseurl+dataSelector.page_param+pages[i];
        console.log(url);

        const html = await rp(url);
            //handling error when fetch news from those site
            try{
                const businessMap = cheerio(dataSelector.dom, html).map(async (i, e) => {
                //get link from list of posts
                const link = e.attribs.href;
                const innerHtml = await rp(link);
                const titleArticle = cheerio(dataSelector.domtitle,innerHtml).text();
                const innerImage = cheerio(dataSelector.domimg,innerHtml).attr('src');
                const newsContent = cheerio(dataSelector.domcontent,innerHtml).text();
                const source = dataSelector.name;
        
                    //combine link, title, image and content in one object
                    return {
                        titleArticle,
                        innerImage,
                        newsContent,
                        link,
                        source
                    }
                }).get();
                //code that causes an error
                let newsByPages = await Promise.all(businessMap);
                allNews.push(newsByPages);            
            }catch(e){
                console.log(e)
            }
        
    }
    // console.log(allNews);
    return allNews;
    //return promise of bussinessMap
};
'use strict';
//export, to access from another method
module.exports = getScrapingNews;
