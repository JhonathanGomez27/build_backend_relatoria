declare const _default: (() => {
    database: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        schema: string;
    };
    session: {
        accessToken: string;
        jwtAccessTokenSecret: string;
        jwtAccessTokenExpiresTime: string;
        jwtRefreshTokenSecret: string;
        jwtRefreshTokenExpiresTime: string;
        jwtForgotPasswordSecret: string;
        jwtForgotPasswordExpiresTime: string;
        api_url: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        schema: string;
    };
    session: {
        accessToken: string;
        jwtAccessTokenSecret: string;
        jwtAccessTokenExpiresTime: string;
        jwtRefreshTokenSecret: string;
        jwtRefreshTokenExpiresTime: string;
        jwtForgotPasswordSecret: string;
        jwtForgotPasswordExpiresTime: string;
        api_url: string;
    };
}>;
export default _default;
