# terraform-analyze
Get time of each module creation in terraform apply

## Installation
`npm i -g terraform-analyze`

## Usage 
`terraform apply | terraform-analyze`

## Screenshot 

![Example output](docs/resource-list.png?raw=true "Example output")

## Timeline graph display
View resources deploy time and identify blocking phases

In order to save data for display add `withGraph` or `-g` flag to `terraform-analyze` command

Add `-t` with second to change the creation time filtering to display in graph (default to 10 seconds)

`terraform apply | terraform-analyze -g -t 2`

Install and run React app:
```js
cd client
npm i
npm start
```
Open http://localhost:3000/ in browser and view graph

To view saved `terraform-apply` log run from project root

`cat logfile | node terraform-analyze.js -g`
