import { http, cloudEvent, } from '@google-cloud/functions-framework'

http('hello', (req, res) => {
    res.send('eiiii!')
})

http('hello2', (req, res) => {
    res.send('yaharu!')
})

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
cloudEvent('helloGCS', cloudEvent => {
    console.log(`Event ID: ${cloudEvent.id}`);
    console.log(`Event Type: ${cloudEvent.type}`);

    const file: any = cloudEvent.data;
    console.log(`Bucket: ${file.bucket}`);
    console.log(`File: ${file.name}`);
    console.log(`Metageneration: ${file.metageneration}`);
    console.log(`Created: ${file.timeCreated}`);
    console.log(`Updated: ${file.updated}`);
});