import express from 'express';
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })
app.use(express.static('dist'));
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            "id": 1,
            "title": "Why did the scarecrow win an award?",
            "description": "Because he was outstanding in his field!"
        },
        {
            "id": 2,
            "title": "What do you call fake spaghetti?",
            "description": "An impasta!"
        },
        {
            "id": 3,
            "title": "Why don't scientists trust atoms?",
            "description": "Because they make up everything!"
        },
        {
            "id": 4,
            "title": "Why did the bicycle fall over?",
            "description": "Because it was two-tired!"
        },
        {
            "id": 5,
            "title": "What do you get when you cross a snowman and a vampire?",
            "description": "Frostbite!"
        },
        {
            "id": 6,
            "title": "Why can't your nose be 12 inches long?",
            "description": "Because then it would be a foot!"
        },
        {
            "id": 7,
            "title": "Why did the math book look sad?",
            "description": "Because it had too many problems."
        },
        {
            "id": 8,
            "title": "Why don’t skeletons fight each other?",
            "description": "They don’t have the guts."
        },
        {
            "id": 9,
            "title": "What did one ocean say to the other?",
            "description": "Nothing, they just waved."
        },
        {
            "id": 10,
            "title": "Why did the golfer bring two pairs of pants?",
            "description": "In case he got a hole in one!"
        }
    ]
    res.send(jokes);

})

app.listen(port, () => {
    console.log("Example app listening on port", port);
})