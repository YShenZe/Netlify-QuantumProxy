export default async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: req.headers,
            method: req.method,
            body: req.method !== 'GET' ? req.body : undefined
        });

        const data = await response.arrayBuffer();
        
        res.setHeader('Content-Type', response.headers.get('Content-Type'));
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send(Buffer.from(data));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};