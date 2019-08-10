const express = require('express');
// const reload = require('express-reload');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const getScrapingNews = require("./index");
const newsData = require("./newsHtmlStructure");

// initialize express as app
const app = express();
//add body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//set template engine
app.set('view engine', 'pug');
//initialize sequelize (database bridge)
// const Sequelize = require('sequelize');
// //config database
// const sequelize = new Sequelize({
//     host: 'db4free.net',
//     username: 'scraper',
//     password: 'scrapertest',
//     database: 'simple_scraper',
//     dialect: 'mysql'
// });
// //connect to database
// sequelize.authenticate()
//     .then(() => console.log('Connected to database'))
//     .catch(err => console.log('Failed connect to database', err));

// //define model (table news with attribs as object
// const News = sequelize.define('news', {
//     id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
//     link: Sequelize.STRING,
//     title: Sequelize.TEXT,
//     image: Sequelize.TEXT,
//     content: Sequelize.TEXT
// });
// //sync, if table not exist, then handle to create it
// News.sync()
//     .then(() => 'Tables News created successfully')
//     .catch(err => console.log('Failed create table', err));

// //create news query
// const createNews = async ({link, title, image, content}) => {
//     return await News.create({link, title, image, content})
// };
// //get all news query
// const getAllNews = async () => {
//     return await News.findAll();
// };


//route method GET / , to display message value
//getAll news
//access from root 'localhost:env.port||8081'
app.get('/', (req, res) => {
    res.render('index', {newsData:newsData});
});
app.post('/',(req,res)=>{
    let formData = req.body;
    //check, input sumber is exist or not
    if (typeof formData.sumber !== "undefined"){
        getScrapingNews(formData.sumber).then((results)=>{
            //limit string to 100 and add "..."
            var filteredResult = results.map(result=>{
                result.titleArticle = result.titleArticle.substr(0,35);
                result.titleArticle = result.titleArticle + "...";
                result.newsContent = result.newsContent.substr(0,100);
                result.newsContent = result.newsContent + "...";
                return result
            });
            return res.render('index',{newsData:newsData,results:filteredResult})
        })
    }
});

//route method GET /news , to display news data array to JSON format
//access from root 'localhost:env.port||8081/news' with GET method
app.get('/news', (req, res) => {
    getAllNews()
        .then(news => res.json(news))
        .catch(err => console.log('failed fetching news', err))

});
//route method POST /scraping , to store scraped news to database
//access from root 'localhost:env.port||8081/scraping' with POST method, data result store to database trough sequelize
app.post('/scraping', (req, res) => {
    //@TODO:add post param (dynamic scarping)
    //@TODO:add UI (make better UX)
    //@TODO:add pagination for fetching more than one page
    //@TODO:cleaning the code, (index.js), still looking for param
    getScrapingNews().then((result) => {
        result.map(news => {
            createNews({
                link: news.link,
                title: news.titleArticle,
                image: news.innerImage,
                content: news.newsContent
            })
        });
        res.json({message: 'Scrapping successfully, saved to the database'})
    })
});

app.post('/fetch', (req, res) => {
    let formData = req.body;
    res.json({sumber: formData.sumber})

});

let newsContent = [];

function mergeNews(news){
    // await 
    let mergedNews = [];
    news.forEach(ne=>{
        mergedNews = mergedNews.concat(ne);
    })
    return mergedNews;
}


//route method GET /scraping , to display scraped news w/out saving to database
app.get('/scraping', async (req, res) => {
    let mergedResults = [];
    let concatResults = [];
    //check, input sumber is exist or not
    for(let i = 0;i<newsData.length;i++){
        if(newsData[i].status){
            console.log(newsData[i].name);
            let results = await getScrapingNews(newsData[i].name);
            mergedResults = await mergeNews(results);
            concatResults.push(mergedResults);
        }
    }
    let finalResults = await mergeNews(concatResults);
    await res.json(finalResults);
});
//start server from localhost with port server or 8081
app.listen(port, () => {
    console.log(`server running at ${port}`)
});