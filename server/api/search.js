const { Router } = require('express');
const indexes = ['artists', 'albums', 'songs', 'playlists']
const router = Router();

const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    cloud: {
      id: 'name:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQxMzc2NDlhODM5NTk0ZTczOGRiN2JkZThjODNkZTVkNyRmNGIwNDNjMGM1NGE0ZDM0ODgxY2MyMDE3ZTg5ZTE1Zg==',
    },
    auth: {
      username: 'elastic',
      password: 'O0yKjai98EckDgHCuC8hxYmK'
    }
  });

router.get('/playlists/:search', async (req, res) => {
    client.search({
        index: 'playlists',
        from: 0,
        size: 100,
        body: {
            query: {
                wildcard: {
                    "Playlist_name": {
                        value: `*${req.params.search}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
        }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(result.body.hits.hits);
        }
    });
});

router.get('/artists/:search', async (req, res) => {
    console.log(req.params.search)
    client.search({
        index: 'artists',
        from: 0,
        size: 100,
        body: {
            query: {
                wildcard: {
                    "Artist_name": {
                        value: `*${req.params.search}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
        }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(result.body.hits.hits);
        }
    });
});

router.get('/songs/:search', async (req, res) => {
    client.search({
        index: 'songs',
        from: 0,
        size: 100,
        body: {
            query: {
                wildcard: {
                    "Title": {
                        value: `*${req.params.search}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
        }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(result.body.hits.hits);
        }
    });
});

router.get('/albums/:search', async (req, res) => {
    client.search({
        index: 'albums',
        from: 0,
        size: 100,
        body: {
            query: {
                wildcard: {
                    "Album_name": {
                        value: `*${req.params.search}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
        }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(result.body.hits.hits);
        }
    });
});



module.exports = router;