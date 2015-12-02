'use strict';

var mongoose = require('mongoose');



var applyPaginate = function(page,limit,totalItens){
  var totalPages = Math.ceil(totalItens/limit);
  var hasNextPage = page < totalPages;
  var hasPrevious = page > 1;
  var startRow = '';
  var endRow =  (totalItens%limit===0) ? startRow -1 + limit : (hasNextPage) ? limit-1+startRow : (totalItens%limit) + startRow -1;
  var nextPage = (hasNextPage ? page+1 : null);
  var prevPage = (hasPrevious ? page-1 : null);
  var hasPagination = (totalPages && totalPages!==1 && totalPages!==0);
  var pages = [];
  for (var i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return {
    totalRows : totalItens, // document count
    totalPages : totalPages, // total pages
    limit : limit,
    current : page,
    hasNextPage : hasNextPage,
    nextPage : nextPage, // next number or null
    hasPreviousPage : hasPrevious, // exist previuous page boolean
    prevPage : prevPage, // prev number or null
    hasPagination : hasPagination,
    startRow : startRow,
    endRow : endRow,
    pages : pages
  };
};

mongoose.Query.prototype.paginate = function paginate (page, limit, cb) {
  page = parseInt(page) || 1;
  limit = limit || 50;

  var query = this;
  var model = this.model;
  var skipFrom = (page * limit) - limit;

  query = query.skip(skipFrom).limit(limit);

  if(cb) {
    query.exec(function(err, docs) {
      if(err) {
        cb(err, null, null);
      } else {
        model.count(query._conditions, function(err, totalItens) {
          if(err) {
            cb(err, null, null);
          } else {
            var pagination = applyPaginate(page,limit,totalItens);
            cb(null, docs, pagination);
          }
        });
      }
    });
  } else {
    return this;
  }
};
