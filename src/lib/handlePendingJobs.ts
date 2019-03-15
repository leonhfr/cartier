export const handlePendingJobs = async (
  jobsRemaining: number
): Promise<number> => {
  // Get first jobsRemaining pending jobs from DynamoDB
  // Send those jobs to SQS
  // Delete from DynamoDB

  // returns the number of jobs handled
  return jobsRemaining;
};
