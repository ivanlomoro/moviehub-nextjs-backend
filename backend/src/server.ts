import express from 'express';
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';
import genreRoutes from './routes/genre.routes';
import { requestRouter } from './routes/requests.routes';
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: { fileSize: 10000000 },
    abortOnLimit: true
}))

app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/genre", genreRoutes);
app.use("/api", requestRouter);

app.get("/", (req, res) => {
    res.status(200).json({message:"Backend api"})
})


export default app