## Cryptocurrency Roller Coaster - Not your average Cryptocurrency Graph

[Live](https://onyi.github.io/cryptocurrency-graphs/)

## Background and Overview

`Cryptocurrency Roller Coaster` is a data visualization page that display cryptocurrencies price during configurable time period in a time-series graph. Then, the time-series graph would be the rail for a roller coaster cart to pass through. 

Users are able to set rail shape by changing graph time periood and types of data being displayed.


## Functionality and MVP Features
* Display cryptocurrency related stats in time-series graph
* Component to adjust period and data type to dynamically adjust graph data
* Add roller coaster animation

## Architecture and Technologies

* Vanilla JavaScript with Ajax to handles API request to fetch Cryptocurrency data
* D3.js for graphs
* Webpack to bundle things up
* Npm to manage dependencies

## Data and APIs

[BitCoin](https://public.opendatasoft.com/api/records/1.0/search/?dataset=bitcoin&sort=date&facet=date)
[Litecoin](https://public.opendatasoft.com/explore/embed/dataset/litecoin/table/?sort=date)
[Etheurm](https://public.opendatasoft.com/explore/embed/dataset/ethereum/table/?sort=date)

## Future Implementation

* User controllable roller coaster cart
* Better transitioning when data updated
