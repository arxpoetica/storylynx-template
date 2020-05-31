// DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
// DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP

import admin_post from 'storylynx/api/admin.post.js'
export const post = async(req, res) => res.json(await admin_post(req))
