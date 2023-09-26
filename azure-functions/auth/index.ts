import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobServiceClient, BlockBlobUploadResponse, StorageSharedKeyCredential } from '@azure/storage-blob';


async function fetchData(): Promise<string> {      
    return new Promise(async(resolve, reject) => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        if(res.ok) {
            const body = await res.json()
            resolve(body)
        }
        else
        resolve('Greška kod dohvatas111 ### ')
    }) 
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const apiData: string = 'abcdef' // await fetchData()

    const storageAccountName = 'vscfunction';
    const storageAccountKey = 'nP6l0ahTiXYUW+VhnOPj7tN0AJbXK0ZZMbVuGKz6RQLxs5akPfUUsUy+lSt91V9EiH5qsTTkvAOu+AStDVFdnA==';
    const containerName = 'my-stuff';
    const blobName = 'first.json';

    let exception: any = ''
    try {

        // Create a BlobServiceClient using the StorageSharedKeyCredential
        const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net`,
            sharedKeyCredential
        );
        
        // Get a reference to the container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        
        // Get a reference to the blob
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const blockBlobUploadResponse: BlockBlobUploadResponse = await blockBlobClient.upload(apiData, apiData.length);
    }
    catch(e) {
        exception += e
    }



        context.res = {
            body: {
                //apiData,
                exception
            }
        };
    context.log(`context.res.body = ${context.res.body}`);

};

export default httpTrigger;
