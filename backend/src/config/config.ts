import dotenv from "dotenv";

type TCONFIG = {
    [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
    app: AppConfig;
    db: MongoDBConfig;
    auth0?: Auth0Config;
    cloudinary: Cloudinary;
};

type Auth0Config = {
    client_origin: string | undefined;
    audience: string | undefined;
    issuer: string | undefined;
};

type MongoDBConfig = {
    URI: string;
}

type AppConfig = {
    PORT: string | number;
};

interface Cloudinary {
    cloud_name: string | undefined,
    api_key: string | undefined,
    api_secret: string | undefined
}

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' })
} else {
    dotenv.config({ path: '.env.development' })
}

const ENV = process.env.NODE_ENV ?? 'development'

const CONFIG: TCONFIG = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI: process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/test_development'
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        },
        cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002
        },
        db: {
            URI: process.env.MONGO_URI_PROD || 'mongodb://localhost:27017/test_production'
        },
        cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    }
}

export default CONFIG[ENV];