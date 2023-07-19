// Import the Google Cloud client libraries
import { BigQuery } from '@google-cloud/bigquery'
import { Storage } from '@google-cloud/storage'

/**
 * This sample loads the JSON file at
 * https://storage.googleapis.com/cloud-samples-data/bigquery/us-states/us-states.json
 *
 * TODO(developer): Replace the following lines with the path to your file.
 */

export async function loadJSONFromGCSTruncate({ bucketname, filename }: { bucketname: string, filename: string }) {
    // const bucketName = 'cloud-samples-data';
    // const filename = 'bigquery/us-states/us-states.json';

    const bigquery = new BigQuery();
    const storage = new Storage();

    const datasetId = "test_from_fn";
    const tableId = "test_table_states";

    // Configure the load job. For full list of options, see:
    // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
    const metadata = {
        sourceFormat: 'NEWLINE_DELIMITED_JSON',
        schema: {
            fields: [
                { name: 'name', type: 'STRING' },
                { name: 'post_abbr', type: 'STRING' },
            ],
        },
        // Set the write disposition to overwrite existing table data.
        writeDisposition: 'WRITE_TRUNCATE',
    };

    // Load data from a Google Cloud Storage file into the table
    const [job] = await bigquery
        .dataset(datasetId)
        .table(tableId)
        .load(storage.bucket(bucketname).file(filename), metadata);

    // load() waits for the job to finish
    console.log(`Job ${job.id} completed.`);
    console.log(
        `Write disposition used: ${job.configuration?.load?.writeDisposition}.`
    );
}