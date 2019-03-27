// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.
import { handleJob } from './lib/handleJob';
import { handlePhotos } from './lib/handlePhotos';
import { makeJobs } from './lib/makeJobs';
import { postponeJobs } from './lib/postponeJobs';
import * as Types from './types';

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

    const { ok, err } = Eratosthenes.JobModel.consume(event);

    debugError(`consume ok: %o`, ok);
    debugError(`consume err: %o`, err);

    await Promise.all(
      ok.map(async job => {
        // Querying Flickr API
        const response = await handleJob(job);

        if (response instanceof Error) {
          return response;
        }

        const { pages, photo } = response;

        // Putting all photos to DynamoDB
        await handlePhotos(photo, job.zone);

        if (job.page !== 1 || pages < 2) {
          return null;
        }

        const pagesArray = [...Array(pages - 1).keys()].map(n => n + 2);

        const makeJobsInput: Array<Types.MakeJobInput> = pagesArray.map(
          page => ({
            minUploadDate: job.minUploadDate,
            maxUploadDate: job.maxUploadDate,
            page,
            zone: job.zone,
          })
        );
        const jobs = makeJobs(makeJobsInput);

        await postponeJobs(jobs);

        // If the page is the first one and there are following pages
        // We make jobs and schedule them

        return null;
      })
    );

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
