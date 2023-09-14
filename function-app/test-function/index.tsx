import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const testFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    // const name = (req.query.name || (req.body && req.body.name));

    if (req) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + JSON.stringify(req)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass some request on the query string or in the request body"
        };
    }
};

export default testFunction;