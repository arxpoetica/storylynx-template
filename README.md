# Johnny Miller's Website

Johnny Miller's personal website.

![Johnny Miller](./static/img/johnny-miller.jpg)

## Development

The following is a bunch of rambled thoughts that I wanted to make sure to record and not forget, but I'll come back to later and better organize.

### Environment Variables

The Johnny Miller website uses `rollup-plugin-replace` for environment variable replacement. Any environment variable prefixed with `JM_` will automatically be replaced in the code if it's listed as a `process.env.*` variable. For example:

	process.env.JM_JWT_SECRET

Is replaced with with the JWT secret.

`process.env.NODE_ENV` and `process.env.PORT` are the only non-prefixed variables to also be replaced.






## Deploying

We're currently deployed on Google Cloud Run.

### Environment Variables

We're using a Google Cloud keyring to encrypt variables and import them directly in an encoded `.env.enc` file. If you need to add, change, or delete any environment variables, make sure the `.env.enc-source` file exists with all appropriate environment variables, then run:

	yarn run keyring

That will encrypt the environment variables. Then commit the changes to `.env.enc` to this repo, and deploy as normal.

### Deploying Changes

The following command publishes a new target.

	yarn run publish

