async function getImages(req, res) {
    try {
        const resp = await fetch('https://images-api.nasa.gov/search?q=moon');
        if (!resp.ok) {
            throw new Error(`Failed Fetching data`);
        }
        const xdata = await resp.json();
        const hrefs = [];
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
        res.status(500).send(JSON.stringify({ error: 'Error fetching data' }));
    }
}

async function getImagesV2(req, res) {
    try {
        const resp = await fetch('https://images-api.nasa.gov/search?q=moon');
        if (!resp.ok) {
            throw new Error(`Failed Fetching data`);
        }
        const xdata = await resp.json();
        const responseData = [];
        xdata.collection.items.forEach(item => {
            if (item.links) {
                const itemData = {
                    links: [],
                    keywords: []
                };
                item.links.forEach(link => {
                    if (link.href) {
                        itemData.links.push(link.href);
                    }
                });
                if (item.data) {
                    item.data.forEach(data => {
                        if (data.keywords) {
                            itemData.keywords = itemData.keywords.concat(data.keywords);
                        }
                    });
                }
                responseData.push(itemData);
            }
        });
        res.send(JSON.stringify(responseData));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(JSON.stringify({ error: 'Error fetching data' }));
    }
}

module.exports = {
    getImages,
    getImagesV2
};
