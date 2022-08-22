fieldname: 'videoFile',
originalname: 'tenaliRama.mp4',
encoding: '7bit',
mimetype: 'video/mp4',
destination: '~/Desktop/BASK/black_box/videos',
filename: '47c12e6e-d6a4-492c-9fda-68d185ee818d-tenaliRama.mp4',
path: '~/Desktop/BASK/black_box/videos/47c12e6e-d6a4-492c-9fda-68d185ee818d-tenaliRama.mp4',
size: 2941461
} files
google
{"filename":"47c12e6e-d6a4-492c-9fda-68d185ee818d-tenaliRama.mp4","title":"title","description":"description"} accha
4/0AdQt8qgy0160D4oRX6wNoW3JZGeZwTtWT8wuMxRPyG4-dyXzrE5oqU6jXsn8TUlOxMbe8Q dekha maine
GET /api/oauth2callback?state=%7B%22filename%22%3A%2247c12e6e-d6a4-492c-9fda-68d185ee818d-tenaliRama.mp4%22%2C%22title%22%3A%22title%22%2C%22description%22%3A%22description%22%7D&code=4%2F0AdQt8qgy0160D4oRX6wNoW3JZGeZwTtWT8wuMxRPyG4-dyXzrE5oqU6jXsn8TUlOxMbe8Q&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%d2Fyoutube.upload 302 20.646 ms - 102
{
access_token: 'ya29.A0AVA9y1vC2ZvJQArXDybfAIqySw7zX7a7CZGKxS-r5PajbXTVMUeXzpV_KPr1QyDhSFKA1MMVV422ym8osQao_BKPfeullkIwWCFzbkgfD5STn3QAzmDlN8fVkOCVD0SRMxzTOaS7rpKYPQ5VSyuljdUFwei-aCgYKATASATASFQE65dr8wo78W-p6YnDZZqWKPPcIcw0163',
scope: 'https://www.googleapis.com/auth/youtube.upload',
token_type: 'Bearer',
expiry_date: 1661133762918
} from get token...
here is right...
{
config: {
url: 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet%2Cstatus&uploadType=multipart',
method: 'POST',
userAgentDirectives: [ [Object] ],
paramsSerializer: [Function (anonymous)],
data: PassThrough {
\_readableState: [ReadableState],
\_events: [Object: null prototype],
\_eventsCount: 2,
\_maxListeners: undefined,
\_writableState: [WritableState],
allowHalfOpen: true,
\_flush: [Function: flush],
[Symbol(kCapture)]: false,
[Symbol(kCallback)]: null
},
headers: {
'x-goog-api-client': 'gdcl/4.4.3 gl-node/16.16.0 auth/6.1.6',
'content-type': 'multipart/related; boundary=08aeb1d6-cf57-49b3-a0ce-4c564656afdc',
'Accept-Encoding': 'gzip',
'User-Agent': 'google-api-nodejs-client/4.4.3 (gzip)',
Authorization: 'Bearer ya29.A0AVA9y1vC2ZvJQArXDybfAIqySw7zX7a7CZGKxS-r5PajbXTVMUeXzpV_KPr1QyDhSFKA1MMVV422ym8osQao_BKPfeullkIwWCFzbkgfD5STn3QAzmDlN8fVkOCVD0SRMxzTOaS7rpKYPQ5VSyuljdUFwei-aCgYKATASATASFQE65dr8wo78W-p6YnDZZqWKPPcIcw0163',
Accept: 'application/json'
},
params: { part: 'snippet,status', uploadType: 'multipart' },
validateStatus: [Function (anonymous)],
retry: true,
body: PassThrough {
\_readableState: [ReadableState],
\_events: [Object: null prototype],
\_eventsCount: 2,
\_maxListeners: undefined,
\_writableState: [WritableState],
allowHalfOpen: true,
\_flush: [Function: flush],
[Symbol(kCapture)]: false,
[Symbol(kCallback)]: null
},
responseType: 'json'
},
data: {
kind: 'youtube#video',
etag: '3LyqMVb9-xxdioyXsZ4RGoR_KD0',
id: 'pVyHGE3R8KM',
snippet: {
publishedAt: '2022-08-22T01:02:46Z',
channelId: 'UCiBfEIx2KaRnf6oKvl3W5ew',
title: 'title',
description: 'description',
thumbnails: [Object],
channelTitle: 'Black Box',
categoryId: '22',
liveBroadcastContent: 'none',
localized: [Object]
},
status: {
uploadStatus: 'uploaded',
privacyStatus: 'unlisted',
license: 'youtube',
embeddable: true,
publicStatsViewable: true
}
},
headers: {
'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
'cache-control': 'private',
connection: 'close',
'content-encoding': 'gzip',
'content-type': 'application/json; charset=UTF-8',
date: 'Mon, 22 Aug 2022 01:03:12 GMT',
server: 'UploadServer',
'transfer-encoding': 'chunked',
vary: 'Origin, X-Origin, Referer',
warning: '214 UploadServer gzipped',
'x-guploader-response-body-transformations': 'gzipped',
'x-guploader-uploadid': 'ADPycduC1G1XJRucqvSp9np-YtWj2-iHK-eI7dN61HQ-T7z1VCMGgvUFwgDLYWvUYYNT2TGBOS6L0oPYwL8Fm8BVPypJ4g'
},
status: 200,
statusText: 'OK',
request: {
responseURL: 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet%2Cstatus&uploadType=multipart'
}
} done...
[nodemon] clean exit - waiting for changes before restart
