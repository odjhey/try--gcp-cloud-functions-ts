


// bucket to bigquery table map

// sampol
// File: folder1989/
// Bucket: test-bucket-notifs


type CONFIG = {
    datasetId: string,
    tableId: string,
    metadata: {
        sourceFormat: 'NEWLINE_DELIMITED_JSON',
        schema: {
            fields: { name: string, type: 'STRING' }[]
        },

        // Set the write disposition to overwrite existing table data.
        writeDisposition: 'WRITE_TRUNCATE',
    }
}


export const BUCKET_TO_TABLE_CONFIGMAP: Record<string, {
    loadedFilePatternMatcher: (filename: string) => { found: true, config: CONFIG } | { found: false }
}> = {

    // bucketName: { filepattern: fn, targetConfig: {table, schema} }
    "test-bucket-notifs": {
        loadedFilePatternMatcher: (filename: string) => {
            if (filename.startsWith('folder1989/rawin_us_states')) {
                return {
                    found: true,
                    config: {
                        datasetId: 'test_from_fn',
                        tableId: "test_table_states",
                        metadata: {
                            sourceFormat: 'NEWLINE_DELIMITED_JSON',
                            schema: {
                                fields: [
                                    { name: 'name', type: 'STRING' },
                                    { name: 'post_abbr', type: 'STRING' },
                                ],
                            },

                            // Set the write disposition to overwrite existing table data.
                            writeDisposition: 'WRITE_TRUNCATE',
                        }
                    }
                }
            }

            if (filename.startsWith('folder1989/rawin_others')) {
                return {
                    found: true,
                    config: {
                        datasetId: 'test_from_fn',
                        tableId: "test_table_others",
                        metadata: {
                            sourceFormat: 'NEWLINE_DELIMITED_JSON',
                            schema: {
                                fields: [
                                    { name: 'somekey', type: 'STRING' },
                                    { name: 'somemessage', type: 'STRING' },
                                ],
                            },

                            // Set the write disposition to overwrite existing table data.
                            writeDisposition: 'WRITE_TRUNCATE',
                        }
                    }
                }
            }


            return { found: false }
        }
    }
}