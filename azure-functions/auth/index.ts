import { AzureFunction, Context, HttpRequest } from "@azure/functions"

async function fetchData(): Promise<string> {      
    return new Promise(async(resolve, reject) => {
        const res = await fetch("https://mpr.datamart.ams.usda.gov/services/v1.1/reports/2453?q=report_date=05/19/2023")
        if(res.ok) {
            const body = await res.json()
            return resolve(body)
        }
        else
        resolve('Greška kod dohvatas')
    }) 
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const apiData = await fetchData()

        context.res = {
            body: {
                apiData
            }
        };
    context.log(`context.res.body = ${context.res.body}`);

};

export default httpTrigger;