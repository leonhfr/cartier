// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';
// import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.

// Code.
const debugError = debug('cartier:error:consumer');
const debugVerbose = debug('cartier:verbose:consumer');

export const main = async (
  event: AWSLambda.SQSEvent,
  context: AWSLambda.Context,
  callback: AWSLambda.Callback
) => {
  try {
    debugVerbose(`event: %j`, event);
    debugVerbose(`context: %j`, context);

    // const { ok, err } = Eratosthenes.JobModel.consume(event);

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
