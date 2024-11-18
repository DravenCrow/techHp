import express, { Express, Request, Response } from "express";
import cors from "cors";
import { getUniqueAlbumsFromArtist } from "./itunesApi";
import { z } from "zod";

const app: Express = express();

app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send("Server to search Itunes API for unique albums from an artist");
});

app.get('/api/albums/:artist', async (req, res) => {
    console.log('* Request received for artist:', req.params.artist);
    try {
        const { artist } = req.params;
        const result = await getUniqueAlbumsFromArtist(artist);
        res.json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(500).json({ error: 'Error validating data: Invalid data from iTunes API'});
        } else {
            res.status(500).json({ error: 'Failed to fetch albums' });
        }
    }
});

export default app;