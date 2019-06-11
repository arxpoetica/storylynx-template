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

### delete the GCR image

	gcloud container images delete [IMAGE_NAME]

### list all git commits since TAG

	git log v0.1.0..HEAD --pretty=format:'%h'

### list the commit sha1s for all TAGs

git log --oneline --decorate --tags --no-walk --pretty=format:'%h'
you take the full list (1st git command) and exclude the tags' commits (2nd git command)
pipe the remaining results thru to gcloud. requires/assumes that your images are setup in this format:
gcr.io/PROJECT/service_name:commit_hash
