gcloud functions deploy finalize-bucket-listener \
  --gen2 \
  --runtime=nodejs18 \
  --entry-point helloGCS \
  --region=asia-southeast1 \
  --memory=128mi \
  --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \
  --trigger-event-filters="bucket=test-bucket-notifs"

