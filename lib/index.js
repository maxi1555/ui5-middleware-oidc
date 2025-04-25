const { auth, requiresAuth } = require('express-openid-connect');

module.exports = function ({ resources, options }) {
    const oidcMiddleware = auth(options.configuration);
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