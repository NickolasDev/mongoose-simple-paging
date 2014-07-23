# mongoose-simple-paging

[![NPM version](https://badge.fury.io/js/mongoose-simple-paging.svg)](http://badge.fury.io/js/mongoose-simple-paging)

## Install

```sh
$ npm install mongoose-simple-paging
```

## Example

```js
require('mongoose-simple-paging');

var page = req.query.page;
var query = MyModel.find();

query.paginate(page, limit,function(err, docs,pagination) {

  //docs  - documents,
  //pagination{
    //totalRows
    //totalPages
    //limit
    //current
    //hasNextPage
    //nextPage
    //hasPreviousPage
    //prevPage
    //hasPagination
    //startRow
    //endRow
    //pages

  //}
});
```

## TODO
Test

## License

The MIT License (MIT)