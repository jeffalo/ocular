---
title: privacy
description: ocular privacy stuff.
---

*TLDR: ocular only collects basic analytics data, registered user data and data that powers features such as reactions and starring. I don't want your private info.*

ocular uses a number of services to provide various tools to enhance the experience. These services may collect and or use data according to their privacy policies.

- To collect basic usage analytics, ocular uses a self-hosted instance of [Plausible Analytics](https://plausible.io). You can find out more about what kind of information is collected at the [Plausible Analytics website](https://plausible.io).

- ocular uses [CloudFlare](https://cloudflare.com) to proxy requests, this keeps the site running smoothly and allows me to host ocular right from my home.

- Data about Scratch forum posts comes from [ScratchDB](https://scratchdb.lefty.one), and Scratch based authentication is handled by [FluffyScratch](https://github.com/hamptonmoore/FluffyScratch). All other Scratch data comes straight from [the official Scratch API](https://github.com/llk/scratch-rest-api).

- ocular does not store any Scratch data. ocular's purpose is to present data from the APIs listed above. Outside of analytics, ocular only stores registered user data, and data to power reactions and starring. User accounts are not required to use the base functionality of ocular.

- ocular (and my other projects) are hosted on a server running NGINX. For security purposes, NGINX logs may include IP addresses.

- If you would like data deletion from ocular, contact me at `jeffalobob at gmail`

- For external services, please consult their sites for information about how data is stored and used, if you have any questions about your privacy when using ocular feel free to contact me about it.