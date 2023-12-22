import express from 'express';
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';
import genreRoutes from './routes/genre.routes';
import { requestRouter } from './routes/requests.routes';
import cors from 'cors'
import errorHandler from './middleware/error.middleware';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/genre", genreRoutes);
app.use("/api", requestRouter);
app.use(errorHandler)


export default app