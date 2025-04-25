const { auth, requiresAuth } = require('express-openid-connect');

module.exports = function ({ resources, options }) {
    const oidcMiddleware = auth({
        issuerBaseURL: options.configuration.issuerBaseURL,
        baseURL: options.configuration.baseURL,
        clientID: options.configuration.clientId,
        clientSecret: options.configuration.clientSecret,
        secret: options.configuration.sessionSecret,
        idpLogout: true,
        authorizationParams: {
            response_type: 'code',
            scope: options.configuration.scope,
        }
    });
    return (req, res, next) => {
        oidcMiddleware(req, res, (err) => {
            if (err) {
                console.error('OIDC middleware error:', err);
                return res.status(500).send('OIDC middleware failed');
            }
            requiresAuth()(req, res, (err) => {
                if (err) {
                    console.error('Authentication error:', err);
                    return res.status(401).send('Authentication failed');
                }
                req.headers['Authorization'] = `Bearer ${req.oidc.accessToken?.access_token}`;
                next();
            });
        });
    };
};