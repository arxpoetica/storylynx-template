// FOR INSTRUCTIONS ON OVERRIDING THIS FUNCTIONALITY
// CONFER WITH THE DOCUMENTATION

import public_post from 'storylynx/api/public.post.js'
export const post = async(req, res) => res.json(await public_post(req))
