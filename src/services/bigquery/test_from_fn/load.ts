// Import the Google Cloud client libraries
import { BigQuery } from '@google-cloud/bigquery'
import { Storage } from '@google-cloud/storage'
import { BUCKET_TO_TABLE_CONFIGMAP } from './load-mapping';

/**
 * This sample loads the JSON file at
 * https://storage.googleapis.com/cloud-samples-data/bigquery/us-states/us-states.json
 *
 * TODO(developer): Replace the following lines with the path to your file.
 */

export async function loadJSONFromGCSTruncate({ bucketname, filename }: { bucketname: string, filename: string }) {
    // const bucketName = 'cloud-samples-data';
    // const filename = 'bigquery/us-states/us-states.json';

    const bucketConfig = BUCKET_TO_TABLE_CONFIGMAP[bucketname]
    if (bucketConfig === undefined) {
        console.log(`bucket ${bucketname} not found in config map`)
        return
    }
    console.log(`bucket ${bucketname} config found`)

    const config = bucketConfig.loadedFilePatternMatcher(filename)
    if (!config.found) {
        console.log(`no config match for file ${filename} found`)
        return
    }
    console.log(`bucket ${bucketname} file ${filename} config found`)

    const bigquery = new BigQuery();
    const storage = new Storage();

    const datasetId = config.config.datasetId
    const tableId = config.config.tableId

    // Configure the load job. For full list of options, see:
    // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
    const metadata = config.config.metadata

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