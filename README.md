# ui5-middleware-oidc

> :wave: This is a **community project** and there is no official support for this package! Feel free to use it, open issues, contribute, and help answering questions.

Middleware for [ui5-server](https://github.com/SAP/ui5-server), enabling a generic login support.

The middleware will authenticate the users using OIDC, behind the hood is express-openid-connect.

## Prerequisites

- Requires at least [`@ui5/cli@4.0.0`](https://sap.github.io/ui5-tooling/v4/pages/CLI/) (to support [`specVersion: "4.0"`](https://sap.github.io/ui5-tooling/pages/Configuration/#specification-version-40))

## Install

```bash
npm install ui5-middleware-oidc --save-dev

```

## Configuration options (in `$yourapp/ui5.yaml`)

Configurations are sent directly to express-openid-connect

## Usage

1. Define the dependency in `$yourapp/package.json`:

```json
"devDependencies": {
    // ...
    "ui5-middleware-oidc": "*"
    // ...
}
```

2. configure it in `$yourapp/ui5.yaml`:

```yaml
server:
  customMiddleware:
    - name: ui5-middleware-oidc
      afterMiddleware: compression
      configuration:
        issuerBaseURL: "<issuerBaseURL>"
        baseURL: "<baseURL>"
        clientID: "<clientId>"
        clientSecret: "<clientSecret>"
        secret: "<sessionSecret>"
        idpLogout: true
        authorizationParams:
          response_type: "code"
          scope: "openid profile email"

```

## License

Apache 2.0.