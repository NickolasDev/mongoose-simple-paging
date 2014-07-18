# Mongoose pagination

A [Mongoose](https://github.com/LearnBoost/mongoose) paginatation plugin

## Example

```javascript
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
## License

The MIT License





