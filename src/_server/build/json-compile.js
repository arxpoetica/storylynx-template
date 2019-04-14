import fs from 'fs'

const save = async () => {
	const parts = process.env.f.split('/')
	const name = parts[parts.length - 1].split('.js')[0]
	const { default: template } = await import(`../../_client/json/${name}`)
	const result = JSON.stringify(template(), null, '\t')
	fs.writeFile(`static/json/${name}.json`, result, function(err) {
		if (err) {
			return console.log(err)
		}
		console.log('The file was saved!')
	})
}
save()
