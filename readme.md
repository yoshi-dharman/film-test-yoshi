# Film List

Test Project.

## Installation

Use the [node JS](https://nodejs.org/en/) to start the server.

```bash
npm install
npm run dev
```

## UI
Just use "index.htm" inside the folder

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