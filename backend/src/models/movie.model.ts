import { Document, model, Schema } from 'mongoose';

export interface IMovieDocument extends Document {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema = new Schema<IMovieDocument>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        poster_image: {
            type: String,
            required: [true, 'Poster image is required'],
        },
        score: {
            type: Number,
            required: [true, 'Score is required'],
        },
        genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
    },
    { timestamps: true, versionKey: false }
);

const MovieModel = model<IMovieDocument>('Movies', MovieSchema);

export default MovieModel;
