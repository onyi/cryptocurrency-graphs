## Cryptocurrency Roller Coaster - Not your average Cryptocurrency Graph

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
* HTML5 Canvas for graphic rendering
* Webpack to bundle things up

## Data and APIs

[BitCoin](https://public.opendatasoft.com/api/records/1.0/search/?dataset=bitcoin&sort=date&facet=date)
[Litecoin](https://public.opendatasoft.com/explore/embed/dataset/litecoin/table/?sort=date)
[Etheurm](https://public.opendatasoft.com/explore/embed/dataset/ethereum/table/?sort=date)



## Implementation Timeline

#### Day 1: 

Research for ideas, and create project skeleton

#### Day 2: 

Show time-series graph using D3.js

#### Day 3: 

Add buttons to adjust graph data based on user input

#### Day 4: 

Research for animation with D3 graphs
Add roller coaster cart on top of D3 graphs, and add animations

#### Day 5: 

Production README, and polish things up
