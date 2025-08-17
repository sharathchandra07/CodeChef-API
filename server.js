const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const cheerios = require('cheerio');
const axios = require('axios');

app.get('/', (req, res) => {
    res.json("hello");
})

app.get('/api/data/:id', async(req, res) => {
    const { id } = req.params;

    const url = `https://www.codechef.com/users/${id}/`;
                
    try {
        const { data } = await axios.get(url);
        const $ = cheerios.load(data);

        const scrapedData = {};

        scrapedData["Username"] = $('body > main > div > div > div > div > div > section.user-details > ul > li:nth-child(1) > span')
    .text()
    .trim();

    // Country should be scraped from the page, not hardcoded
    scrapedData["Country"] = $('span.user-country-name').text().trim();

    // Extract number inside parentheses for contests
    scrapedData["Contests"] = $('body > main > div > div > div > div > div > section.rating-data-section.problems-solved > h3:nth-child(5)')
        .text()
        .trim()
        .match(/\d+/)?.[0] || "";

    // Extract number after "Total Problems Solved"
    scrapedData["Problems Solved"] = $('body > main > div > div > div > div > div > section.rating-data-section.problems-solved > h3:nth-child(10)')
        .text()
        .trim()
        .match(/\d+/)?.[0] || "";

            res.json(scrapedData);
        } catch (error) {
            console.error("Error fetching or scraping:", error.message);
            res.status(500).json({ error: "Failed to fetch or parse user profile." });
        }
    });

const port = 5000;
app.listen(port, () => {
    console.log(`server running at ${port}`);
})

module.exports = app;