import * as testRail from './testrail.js';
import * as testomatio from './testomatio.js';

async function retryRequest(requestFn, ...args) {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            return await requestFn(...args);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter ? parseInt(retryAfter, 10) : 60; // Default to 60 seconds if no Retry-After header

                console.log(`Received 429. Waiting for ${waitTime} seconds before retrying...`);
                await new Promise(resolve => setTimeout(resolve, waitTime * 1000));

                retries++;
            }
            else {
                throw error;
            }
        }
    }

    throw new Error('Max retries reached. Unable to complete the request.');
}


// Wrap TestRail functions
export const fetchFromTestRail = (...args) => retryRequest(testRail.fetchFromTestRail, ...args);
export const downloadFile = (...args) => retryRequest(testRail.downloadFile, ...args);

// Wrap Testomatio functions
export const uploadFile = (...args) => retryRequest(testomatio.uploadFile, ...args);
export const fetchFromTestomatio = (...args) => retryRequest(testomatio.fetchFromTestomatio, ...args);
export const postToTestomatio = (...args) => retryRequest(testomatio.postToTestomatio, ...args);
export const putToTestomatio = (...args) => retryRequest(testomatio.putToTestomatio, ...args);

// Re-export other functions and constants
export const { getTestRailUrl, getTestRailEndpoints } = testRail;
export const { getTestomatioEndpoints, loginToTestomatio } = testomatio;
