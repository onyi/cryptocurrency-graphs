// Fetch data from opendatasoft API


const baseUrl = "https://public.opendatasoft.com/";

module.exports = {
  bitcoin: baseUrl + '/api/records/1.0/search/?dataset=bitcoin&sort=date&facet=date',
  litecoin: baseUrl + '/api/records/1.0/search/?dataset=litecoin&sort=date&facet=medianfee&facet=blocksize',
  ethereum: baseUrl + '/api/records/1.0/search/?dataset=ethereum&sort=date',

}