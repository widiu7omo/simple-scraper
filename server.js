const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const getScrapingNews = require("./index");
// initialize express as app
const app = express();
//add body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//initialize sequelize (database bridge)
const Sequelize = require('sequelize');
//config database
const sequelize = new Sequelize({
    host: 'db4free.net',
    username: 'scraper',
    password: 'scrapertest',
    database: 'simple_scraper',
    dialect: 'mysql'
});
//connect to database
sequelize.authenticate()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Failed connect to database', err));

//define model (table news with attribs as object
const News = sequelize.define('news', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    link: Sequelize.STRING,
    title: Sequelize.TEXT,
    image: Sequelize.TEXT,
    content: Sequelize.TEXT
});
//sync, if table not exist, then handle to create it
News.sync()
    .then(() => 'Tables News created successfully')
    .catch(err => console.log('Failed create table', err));

//create news query
const createNews = async ({link, title, image, content}) => {
    return await News.create({link, title, image, content})
};
//get all news query
const getAllNews = async () => {
    return await News.findAll();
};


//route method GET / , to display message value
//getAll news
//access from root 'localhost:env.port||8081'
app.get('/', (req, res) => {
    res.json({message: 'express are running'});
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
    getScrapingNews().then((result) =>
        {
            result.map(news=>{
               createNews({
                   link:news.link,
                   title:news.titleArticle,
                   image:news.innerImage,
                   content:news.newsContent
               })
            });
            res.json({message:'Scrapping successfully, saved to the database'})
        })
});

//route method GET /scraping , to display scraped news w/out saving to database
app.get('/scraping', (req, res) => {
    getScrapingNews().then((result) =>
    {
        res.json(result)
    })
});
//start server from localhost with port server or 8081
app.listen(port, () => {
    console.log(`server running at ${port}`)
});