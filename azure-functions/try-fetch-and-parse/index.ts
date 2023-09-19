import { AzureFunction, Context } from "@azure/functions"

let counter = 0
let startTIme = new Date().toTimeString()

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
     context.log(JSON.stringify({counter, startTIme}))
     counter++
     //var timeStamp = new Date().toISOString();
     
     //if (myTimer.isPastDue)
     //{
     //    context.log('Timer function is running late!');
     //}
     //context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
