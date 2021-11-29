var client = require('twitter')({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

client.get('statuses/user_timeline', {
    count: 200
}, function(error, response) {
    if (!error && response.length > 0) {
        for (var i = 0; i < response.length; i++) {
            deleteTweet(response[i])
        }
    }
})

client.get('favorites/list', {
    screen_name: process.env.TWITTER_USER,
    count: 200
}, function(error, response) {
    if (!error && response.length > 0) {
        for (var i = 0; i < response.length; i++) {
            deleteFavorite(response[i]);
        }
    } 
});

function deleteFavorite(tweet) {
    client.post('favorites/destroy', {
        id: tweet.id_str
    }, function(error, response) {
        if (!error) {
            console.log("unfav: " + tweet.text);
        } else {
            console.log(error);
        }
    });
}

function deleteTweet(tweet) {
    client.post('statuses/destroy/', {
        id: tweet.id_str
    }, function(error, response) {
        if (!error) {
            console.log("deleted: " + tweet.text)
        } else {
            console.log(error)
        }
    })
}