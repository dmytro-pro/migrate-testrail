import 'dotenv/config.js'
import migrateTestCases from './migrate.js';
import { configureTestRail } from './testrail.js';
import { configureTestomatio } from './testomatio.js';

// ENABLE THIS LINE TO RUN THE SCRIPT
// PASS VALID VARIABLES TO ACCESS TESTRAIL
// configureTestRail(testrailBaseUrl, username, password, projectId);
configureTestRail(
    process.env.TESTRAIL_URL,
    process.env.TESTRAIL_USERNAME,
    process.env.TESTRAIL_PASSWORD,
    process.env.TESTRAIL_PROJECT_ID
);

// ENABLE THIS LINE TO RUN THE SCRIPT
// PASS VALID VARIABLES TO ACCESS TESTOMATIO
// configureTestomatio(testomatioAccessToken, testomatioHost, testomatioProject);
configureTestomatio(
    process.env.TESTOMATIO_TOKEN,
    process.env.TESTOMATIO_HOST || 'https://app.testomat.io',
    process.env.TESTOMATIO_PROJECT,
);

await migrateTestCases();

// todo: make it work with es6 exports, like in documentation (all the ES6 examples from documentation don't work)
// https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/#asynchronous-functions

// todo: get rid of mysterious 404 errors like this
// Error: Error: Failed to send data: 404 Not Found {"error":"Please add Jira integration for \"DH\" to Testomat.io project \"Codeception Demo\" to unlink \"DH-45\""}
// 2024-10-10T14:35:47.444710338Z stderr:     at postToTestomatio (file:///tmp/5EbMULyR/testomatio.js:87:15)
// 2024-10-10T14:35:47.444737051Z stderr:     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// 2024-10-10T14:35:47.444738136Z stderr:     at async retryRequest (file:///tmp/5EbMULyR/retrywrapper.js:10:20)
// 2024-10-10T14:35:47.444742895Z stderr:     at async migrateTestCases (file:///tmp/5EbMULyR/migrate.js:298:15)
// 2024-10-10T14:35:47.444743352Z stderr:     at async file:///tmp/5EbMULyR/run.js:28:1
// 2024-10-10T14:35:47.44515231Z  stderr: Error adding ref: TypeError: Body is unusable
// 2024-10-10T14:35:47.445155054Z stderr:     at specConsumeBody (node:internal/deps/undici/undici:5549:15)
// 2024-10-10T14:35:47.445173344Z stderr:     at _Response.json (node:internal/deps/undici/undici:5451:18)
// 2024-10-10T14:35:47.44517412Z  stderr:     at postToTestomatio (file:///tmp/5EbMULyR/testomatio.js:92:21)
// 2024-10-10T14:35:47.445177167Z stderr:     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// 2024-10-10T14:35:47.445177613Z stderr:     at async retryRequest (file:///tmp/5EbMULyR/retrywrapper.js:10:20)
// 2024-10-10T14:35:47.44518164Z  stderr:     at async migrateTestCases (file:///tmp/5EbMULyR/migrate.js:298:15)
// 2024-10-10T14:35:47.44518201Z  stderr:     at async file:///tmp/5EbMULyR/run.js:28:1
// 2024-10-10T14:35:47.491353826Z stderr

// todo: debug rate limit cases handling for 429 errors from testrail (wait+retry-after). Retry-wrapper is already operational, but not debugged due to previous 404 errors
// https://support.testrail.com/hc/en-us/articles/7077175066388-Error-handling
// 180 Requests per instance, per minute for TestRail Cloud Professional subscriptions.
// 300 Requests per instance, per minute for TestRail Cloud Enterprise subscriptions.
