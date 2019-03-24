export const schedulePendingJobs = async (
  jobsRemaining: number
): Promise<number> => {
  // TODO: handle pending jobs

  // Get first jobsRemaining pending jobs from DynamoDB
  // Send those jobs to SQS
  // Delete from DynamoDB

  // returns the number of jobs handled
  return jobsRemaining;
};
