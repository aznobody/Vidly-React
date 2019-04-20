
// import Raven from 'raven-js';

function init(){
//     Raven.config('https://27f21103b57b47d8bf68011ebafe7f3a@sentry.io/1442861',{
//     release:'1-0-0',
//     environment:'development-test'
// }).install()
}
function log(error){
    console.log('Logging Error',error);
}

export default{
    init,
    log
}
