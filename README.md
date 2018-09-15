![logo](public/images/logo.jpg)

See how happy this fellow is now that he found this app.


## Live Link
 - https://rbecoskie-scrape.herokuapp.com/

## Usage

![screenshot](public/images/scrape_screen_shot.jpg)

Collect all your favorite news articles from the Verge and save them in one convenient spot. Save the article with a note feature that can be accessed when needed. Grab a new scrape from time to time to stay up to date.

## Features
- Separate files for server logic, data, views, and routing
- User can save articles and notes
- Complete CRUD application
- By using Cheerios, this app can be easily modified to scrape any site

## The Build

- JavaScript
- jQuery
- node.js
- Express.js
- HTML
- Bootstrap
- Body-Parser
- Cheerios
- Express-Handlebars
- Mongoose
- Mongo
- Request

## Code
- The `server.js` file sets up the Express server, the port for both local and `heroku` deployment, npm packages that need to be loaded, and the appropriate routes
- The `server.js` file along with handlebars takes care of the front end as well as the back end
- The saved route stores the user's saved articles
- A modal is toggled to create notes for a saved article
- Javascript handles all the requests with AJAX
- Mongo schemas set up for Mongoose to handle the data

```js
{
	app.get("/scrape", (req, res) => {
    request("https://www.theverge.com/", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $(".c-entry-box--compact__body h2").each(function(i, element) {
          var result = {};
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
          result.saved = false;
          db.Article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              return res.json(err);
            });
        });
        res.send("Scrape Complete");
        res.end();
      }
    });
  });

}
```

### Someday someone will, I know it in all my heart. 
<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/mwFGJN9bZ"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy me a coffee"></a>