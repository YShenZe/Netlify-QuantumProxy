export default async (req, res) => {
  const path = req.url.replace('/.netlify/functions/github/', '');
  const targetUrl = `https://api.openai.com/${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        ...req.headers,
        'User-Agent': 'Netlify Mirror'
      }
    });
    
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};