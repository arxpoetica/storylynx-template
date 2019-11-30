# StoryLynx

Tell your story through the hyperlynx of the web.

![StoryLynx](./static/img/storylynx.svg)

## Development

### Environment Variables

StoryLynx uses `rollup-plugin-replace` for environment variable replacement. Any environment variable prefixed with `LYNX_` will automatically be replaced in the code if it's listed as a `process.env.*` variable. For example:

	process.env.LYNX_JWT_SECRET

Is replaced with with a JWT secret.

`process.env.NODE_ENV` and `process.env.PORT` are the only non-prefixed variables to also be replaced.

### Environment Keyring

StoryLynx uses a Google Cloud keyring to encrypt variables and import them directly in an encoded `.env.enc` file. If you need to add, change, or delete any environment variables, make sure the `.env.enc-source` file exists with all appropriate environment variables, then run:

	yarn run keyring

That will encrypt the environment variables. Then commit the changes to `.env.enc` to this repo, and deploy as normal.

### Deploying Changes

StoryLynx is currently deployed on Google Cloud Run.

The following command publishes a new target.

	yarn run publish
