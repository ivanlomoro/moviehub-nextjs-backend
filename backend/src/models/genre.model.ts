import { Document, model, Schema } from 'mongoose';

export interface IGenreDocument extends Document {
    name: string;
    movies?: string[],
    createdAt?: Date,
    updatedAt?: Date
}

const genreSchema = new Schema<IGenreDocument>({
    name: {
        type: String,
        required: [true, 'Genre is required'],
        unique: true
    },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movies' }],
},
    { timestamps: true, versionKey: false }
)

const GenreModel = model<IGenreDocument>('Genre', genreSchema)

export default GenreModel
