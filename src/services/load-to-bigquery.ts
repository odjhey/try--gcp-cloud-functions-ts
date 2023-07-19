// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

export async function createDataset() {
    // Creates a client
    const bigqueryClient = new BigQuery();

    // Create the dataset
    const [dataset] = await bigqueryClient.createDataset('test_from_fn');
    console.log(`Dataset ${dataset.id} created.`);
}
