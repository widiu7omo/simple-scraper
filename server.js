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
    //check, input sumber is exist or not
    for(let i = 0;i<newsData.length;i++){
        let results = await getScrapingNews(newsData[i].name);
        mergedResults = mergeNews(results);
        mergedResults = mergedResults.concat(mergedResults);
    }
    await res.json(mergedResults);

});

app.listen(port, () => {
    console.log(`server running at ${port}`)
});