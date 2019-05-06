##Simple Scraping News
*How to install*
  1. make sure you already install node.js (LTS recommended)
  2. trough your cmd or terminal 
  type this
  
    npm install
    or
    yarn install
    
*How to use*
    
    goto localhost:8081 
    or 
    simple-scraper-news.herokuapp.com
    / root homepage (GET)
    /scraping (view scraped data from url already defined) (GET)
    /scraping (fetching data from url and save to database) (POST)
    /news (view scraped data from database) (GET)
    
    
> use postman or insomnia to access /scraping with POST method

*Screenshot*
![Screenshoot](assets/ss.png)
  #####TODO:
  - [ ] add post param (dynamic scarping)
  - [ ] add UI (make better UX)
  - [ ] add pagination for fetching more than one page
  - [ ] cleaning the code, (index.js), still looking for param 
  - [ ] add custom config for database     