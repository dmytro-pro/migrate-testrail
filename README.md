# TestRail ➡ Testomat.io Migration Script

This script migrates test cases from TestRail to [Testomat.io](https://testomat.io) via API.

You are free to customize this script if the default behavior doesn't fit your needs.

## Set Up Locally

* Ensure **NodeJS 20+** is installed
* Clone this repository
* Copy `.env.example` to `.env`

```
cp .env.example .env
```

* Fill in TestRail credentials into `.env` file
* Create [General Token](https://app.testomat.io/account/access_tokens) in Testomat.io
* Fill in Testomat.io credentials into `.env` file

```
TESTOMATIO_TOKEN=testomat_****
TESTOMATIO_PROJECT=**
```

> `TESTOMATIO_PROJECT` is a project URL part, e.g. for `https://app.testomat.io/projects/your-project` it is `your-project`

* Install dependencies

```
npm i
```

* Run script

```
npm start
```

## Debugging

To enable more verbose output you can add debug flags via `DEBUG=` environment variable:

* `DEBUG="testomatio:testrail:in"` - print all data coming from TestRail
* `DEBUG="testomatio:testrail:out"` - print all data posting to Testomat.io
* `DEBUG="testomatio:testrail:migrate"` - print all data processing
* `DEBUG="testomatio:testrail:*"` - print all debug information

```
DEBUG="testomatio:testrail:*" npm start
```

## Customization

We keep this repository public, so you could customize the data you import.

Update `migrate.js` script to customize how sections, suites, and cases are obtained. You can customize the way how steps are transformed or test descriptions.

Update the following file and run the script.

## License

MIT
