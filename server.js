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

const sequelize = new Sequelize({
    host: 'db4free.net',
    username: 'scraper',
    password: 'scrapertest',
    database: 'simple_scraper',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Failed connect to database', err));

const News = sequelize.define('news', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    link: Sequelize.STRING,
    title: Sequelize.TEXT,
    image: Sequelize.TEXT,
    content: Sequelize.TEXT
});

News.sync()
    .then(() => 'Tables News created successfully')
    .catch(err => console.log('Failed create table', err));

//create news
const createNews = async ({link, title, image, content}) => {
    return await News.create({link, title, image, content})
};

const getAllNews = async () => {
    return await News.findAll();
};

//getAll news
//access from root 'localhost:env.port||8081'
app.get('/', (req, res) => {
    res.json({message: 'express are running'});
});
//access from root 'localhost:env.port||8081/news' with GET method
app.get('/news', (req, res) => {
    getAllNews()
        .then(news => res.json(news))
        .catch(err => console.log('failed fetching news', err))

});
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
app.get('/scraping', (req, res) => {
    getScrapingNews().then((result) =>
    {
        res.json(result)
    })
});
app.listen(port, () => {
    console.log(`server running at ${port}`)
});