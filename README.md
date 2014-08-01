# drain

A simple Heroku HTTP drain written in NodeJs

## Running

In it's basic no output format,
```bash
npm start
```
To see the Logplex Log lines that are being posted via the body of the request.
```bash
LOG_BODY=1 npm start
```
To see the headers
```bash
LOG_HEADERS=1 npm start
```
Those env variables can be used together to show headers and body for each POST
```bash
LOG_BODY=1 LOG_HEADERS=1 npm start
```

## Getting logs from a Heroku app

You will need a publicly available host to run the application. Running `drain` on the Heroku platform is possible, however it defeats the point. A simple solution to run this locally is to combine it with [ngrok](https://ngrok.com/).
```bash
ngrok 3000
npm start
```

*NOTE: You will need two terminal windows to run both apps in the foreground.*

Take note of the hosts that ngrok reports. You will need it in the next step to add the drain to your existing Heroku application.
```bash
heroku drains:add [NGROK_HOST]/logs -a [YOUR_HEROKU_APP_NAME]
```
That's it. You can tell it is working by looking at your ngrok output. It should be reporting a pile of POST requests responding with an HTTP status of `201 Created`.

