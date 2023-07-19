#!/bin/bash

# gcloud functions deploy hello2 --entry-point hello2 --gen2 --runtime=nodejs18 --trigger-http --allow-unauthenticated --memory=128Mi --region=asia-southeast1
gcloud functions deploy create-dataset --entry-point create-dataset \
  --gen2 \
  --runtime=nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --memory=128Mi \
  --region=asia-southeast1




