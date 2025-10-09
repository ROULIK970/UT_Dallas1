const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337/api/articles';
const CSV_FILE_PATH = './articleData.csv';
const BATCH_SIZE = 100;

// Read CSV
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}



function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Upload function
async function uploadArticlesInBatches() {
    try {
        const articles = await readCSV(CSV_FILE_PATH);
        const batches = chunkArray(articles, BATCH_SIZE);

        console.log(`Total articles: ${articles.length}, Total batches: ${batches.length}`);

        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            console.log(`Uploading batch ${i + 1}/${batches.length}...`);


            const batchData = batch.map((article) => {


                const authorsArray = article['Author']
                    ? article['Author'].split(';').map((name) => {
                        const parts = name.split(',').map(n => n.trim());
                        const lastName = parts[0] || '';
                        const firstName = parts[1] || '';
                        return { firstName, lastName };
                    })
                    : [];
                return {
                    title: article['Article'],
                    journalName: article['Journal Name'],
                    journalAbbreviation: article['Journal Abbreviation'],
                    year: parseInt(article['Year']) || null,
                    volume: article['Volume'] || null,
                    author: authorsArray || [],
                };


            });

            // Upload each item in the batch in parallel
            // await Promise.all(
            //     batchData.map((data) =>
            //         axios.post(
            //             STRAPI_URL,
            //             { data },
            //             {
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                 },
            //             }
            //         )
            //     )
            // );

            await Promise.all(
                batchData.map(async (data) => {
                    try {
                        const existing = await axios.get(`${STRAPI_URL}?filters[title][$eq]=${encodeURIComponent(data.title)}`);
                        if (existing.data.data.length > 0) {
                            console.log(`Skipping already uploaded article: ${data.title}`);
                            return;
                        }
                        await axios.post(STRAPI_URL, { data }, { headers: { 'Content-Type': 'application/json' } });
                    } catch (err) {
                        console.error('Failed to upload article:', data.title, err.response?.data || err.message);
                    }
                })
            );

            console.log(`Batch ${i + 1} uploaded successfully.`);
        }

        console.log('All batches uploaded!');
    } catch (err) {
        console.error('Error uploading articles:', err.response?.data || err.message);
    }
}

uploadArticlesInBatches();
