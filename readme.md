# Film List

Get List of Film from backend with database .JSON,

If you want to change API URL for the UI, open folder "public/js/my.js/" and change line 2

```javascript
const api = "(Change Here)";
```

Feature : 
-
1. Add & Delete Data 
2. Search
3. Loading Response
4. Pagination

## Installation

Use the [node JS](https://nodejs.org/en/) to start the server.

```bash
npm install
npm run dev
```

## UI
Simple UI, just use "index.htm" inside the folder.

index.html get the data from [Heroku](https://film-test-yoshi.herokuapp.com/film)

## API
Already deploy via [Heroku](https://film-test-yoshi.herokuapp.com/film)
```python
Route : 

# Get Film
"GET"   > ./film/

# Search Film
"GET"   > ./film/{String Key}

# Add Film
"POST"   > ./film/
Body required to Add Data
Example = {
    title : "Example",
    genre : "Action, Drama, Comedy",
    rating : "8.1",
    duration : "10 min",
    quality : "HD",
    trailer : "https://google.com",
    watch : "https://youtube.com"
}

# Delete Film
"DELETE"   > ./film/
Body required to Delete Exact Data
Example = {
    title : "Example",
    genre : "Action, Drama, Comedy",
    rating : "8.1",
    duration : "10 min",
    quality : "HD",
    trailer : "https://google.com",
    watch : "https://youtube.com"
}

```

## License
[MIT](https://choosealicense.com/licenses/mit/)