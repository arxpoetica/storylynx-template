# StoryLynx Template

Tell your story through the hyperlynx of the web.

![StoryLynx Template](./src/node_modules/@themes/lynx/static/img/storylynx.svg)

## Setup

> Two roads diverged in a wood...

There are two appropriate ways set up your instance. One is to straight across copy the repository and the other is to clone. The following explains the two methods:

#### Copy

Using [degit](https://github.com/Rich-Harris/degit), you can make a copy without much trouble:

	mkdir my-storylynx
	cd my-storylynx
	npx degit arxpoetica/storylynx-template

You're now free to make changes; note these changes will not be tracked unless and are independent of the origin git repo.

If you want to keep track of any ongoing changes to the base template, you can create an upstream branch in the following (second) way:

#### Clone (Upstream)

First, you'll need to create an empty repository somewhere. For ease of illustration, we'll defer to GitHub here, but it can really be anywhere. We'll call this empty repo `my-storylynx`. Then, from the command line, we'll clone the repo, and add the template as an upstream:

	git clone git@github.com:arxpoetica/my-storylynx.git
	cd my-storylynx
	git remote add upstream git@github.com:arxpoetica/storylynx-template.git
	git pull upstream master
	git push origin master

This gives you the advantage to pull in upstream template changes as you see fit.

## Development

### Environment Variables

StoryLynx uses `@rollup/plugin-replace` for environment variable replacement. Any environment variable prefixed with `LYNX_` will automatically be replaced in the code if it's listed as a `process.env.*` variable. For example:

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
