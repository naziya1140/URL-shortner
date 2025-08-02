import { urlData } from '../models/url.js';

//whenever a request on new URL is made.
async function logAndRedirectUrl(req, res) {
    try {
        const shortId = req.params.shortId;//validating if shortId has URL.
        if (!shortId) return res.status(400).json('Enter url');
        const data = await urlData.findOneAndUpdate({ newUrl: `http://127.0.0.1:8000/${shortId}` }, { $push: { visitedHistory: { timestamp: Date.now() } } });
        if (!data) return res.status(400).json('Please enter a valid URL');//url not exist in Database.
        const original = data.oldUrl;
        return res.redirect(original);
    }
    catch (e) {
        res.status(500).json({error: `Internal Server Error while Redirecting. Please Try Again!`});
    }
}

function renderMainPage(req, res) {
    return res.render('index');
}

export {
    logAndRedirectUrl,
    renderMainPage
}