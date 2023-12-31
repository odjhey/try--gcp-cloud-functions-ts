import { http, cloudEvent, } from '@google-cloud/functions-framework'
import { createDataset } from './services/bigquery/test_from_fn/create-dataset'
import { loadJSONFromGCSTruncate } from './services/bigquery/test_from_fn/load'

http('hello', (req, res) => {
    res.send('eiiii!')
})

http('hello2', (req, res) => {
    res.send('yaharu!')
})

http('create-dataset', (req, res) => {
    createDataset().then(() => {
        console.log()
        res.send('yay!')
    }, (reason) => {
        console.log(reason)
        res.send('failed!')
    })
})

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
cloudEvent('helloGCS', async cloudEvent => {
    console.log(`Event ID: ${cloudEvent.id}`);
    console.log(`Event Type: ${cloudEvent.type}`);

    const file: any = cloudEvent.data;
    console.log(`Bucket: ${file.bucket}`);
    console.log(`File: ${file.name}`);
    console.log(`Metageneration: ${file.metageneration}`);
    console.log(`Created: ${file.timeCreated}`);
    console.log(`Updated: ${file.updated}`);

    await loadJSONFromGCSTruncate({ bucketname: file.bucket, filename: file.name })

});