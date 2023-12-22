import dotenv from "dotenv";

type TCONFIG = {
    [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
    app: AppConfig;
    db: MongoDBConfig;
    auth0?: Auth0Config;
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
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002
        },
        db: {
            URI: process.env.MONGO_URI_PROD || 'mongodb://localhost:27017/test_production'
        }
    }
}

export default CONFIG[ENV];