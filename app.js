
import express from 'express'

const app = express();
const port = process.env.PORT||3794;

console.log(app);

const hrefs = [];
app.get('/api/getImages', async (req, res) => {
    try {
        const resp = await fetch('https://images-api.nasa.gov/search?q=moon');
        if (!resp.ok) {
            throw new Error(`Failed Fetching data`);
        }
        const xdata = await resp.json();
        xdata.collection.items.forEach(item => {
            if (item.links) {
                item.links.forEach(link => {
                    if (link.href) {
                        hrefs.push(link.href);
                    }
                });
            }
        });
        res.send(JSON.stringify(hrefs));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

