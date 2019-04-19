# sbot-web

a Proof of Concept sbot running in the browser.

currently hard coded to connect to my pub, and replicate it's feed.

but this does do:

* stores keys
* persists messages
* connects to a remote server
* replicates with that server

## usage

```
git clone git@github.com:dominictarr/sbot-web.git
cd sbot-web
npm install
npm run build
firefox web.html
# hit ctrl-shift-i to open console. should see a bunch of messages received and some EBT:send EBT:recv

```
