---
title: API documentation
headertitle: api
description: ocular api documentation.
---

ocular's api is integrated into a [handful of scratch-related projects](/docs/gallery). that's pretty cool in my opinion.

the public ocular api is designed for retrieving data, not for setting it. in the future i might include some api token stuff, but that gets complicated and un-fun. please don't use the internal api endpoints (the ones not documented here) to update data automatically. it makes moderation harder.

all api endpoints should be assumed to be under `my-ocular.jeffalo.net` unless otherwise noted.

## get an ocular user

make a GET request to `/api/user/:username`


### example response

(from `https://my-ocular.jeffalo.net/api/user/Jeffalo`)

```json
{
  "_id": "5fb91a89532f943b9046e3ba",
  "name": "Jeffalo",
  "status": "{joke}",
  "color": "#0fbd8c",
  "admin": true,
  "meta": {
    "updated": "2021-05-09T13:24:30.021Z",
    "updatedBy": "Jeffalo"
  }
}
```

<div :class="`alert error`">
    the content of `status` is not sanitized against HTML. you are expected to do that yourself. in vanilla javascript, it is as simple as setting `innerText`, instead of `innerHTML`.
</div>

note that some users have less data stored for them. you should only ever assume that `name`, `status` and `color` exist.

### example of how to display a status

<Status user="Jeffalo"></Status>
<br><br>

## get reactions for a post

make a GET request to `/api/reactions/:post-id`

you can use the query parameter `?noReplace=true` to retrieve raw status data

### example response

(from from `https://my-ocular.jeffalo.net/api/reactions/5213429`)

```json
[
  {
    "emoji": "👍",
    "reactions": [
      
    ]
  },
  {
    "emoji": "👎",
    "reactions": [
      
    ]
  },
  {
    "emoji": "😄",
    "reactions": [
      
    ]
  },
  {
    "emoji": "🎉",
    "reactions": [
      
    ]
  },
  {
    "emoji": "😕",
    "reactions": [
      
    ]
  },
  {
    "emoji": "❤️",
    "reactions": [
      
    ]
  },
  {
    "emoji": "🚀",
    "reactions": [
      {
        "_id": "60981f3ba1422d902532f0da",
        "post": "5213429",
        "user": "Jeffalo",
        "emoji": "🚀"
      }
    ]
  },
  {
    "emoji": "👀",
    "reactions": [
      
    ]
  }
]
```

## prompt to set reactions for a post

this is a special page on `ocular.jeffalo.net`, it works well with the my-ocular endpoint to get reactions for a post

### use it in your site

1. open a popup for `https://ocular.jeffalo.net/react/:post-id?emoji=:emoji`
2. if you're using the my-ocular endpoint to get reactions, when the pop up is closed re-fetch the reactions.

### example screenshot

(from from `https://ocular.jeffalo.net/react/5213429?emoji=🚀`)

![screenshot of ocular reaction popup](/reaction-screenshot.png)

## ocular status secrets

hey you! did you know you can include automatically updating elements to your ocular statuses? place one of these in your status make yourself look cool and knowledgeable!

- `{joke}` for a funny joke
- `{total}` for the total amount of registered ocular users
- `{count}` for your post count

### bonus tip

you can escape these with a backslash `\` if you don't want them to be replaced