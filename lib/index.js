const { auth, requiresAuth } = require('express-openid-connect');

module.exports = function ({ resources, options }) {
    const oidcMiddleware = auth({
        issuerBaseURL: options.configuration.issuerBaseURL || process.env.ISSUER_BASE_URL,
        baseURL: options.configuration.baseURL || process.env.BASE_URL,
        clientID: options.configuration.clientId || process.env.CLIENT_ID,
        clientSecret: options.configuration.clientSecret || process.env.CLIENT_SECRET,
        secret: options.configuration.sessionSecret || process.env.SESSION_SECRET,
        idpLogout: true,
        authorizationParams: {
            response_type: 'code',
            scope: options.configuration.scope || process.env.SCOPE,
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