class ApiFeatures {
    constructor(model, queryStr) {
      this.model = model;
      this.queryStr = queryStr || '';
    }
    filter() {
      const queryObj = { ...this.queryStr };
      const excludedFields = ['page', 'limit', 'sort', 'fields'];
      excludedFields.forEach((field) => delete queryObj[field]);
      const whereClause = {};
      for (const key in queryObj) {
        whereClause[key] = queryObj[key];
      }
      this.model = this.model.findAll({
        where: whereClause,
      });
      return this;
    }
  
    sort() {
        if (this.queryStr.sort) {
          const sortByFields = this.queryStr.sort.split(',');
          const orderCriteria = sortByFields.map((field) => {
            if (field.startsWith('-')) {
              return [field.slice(1), 'DESC'];
            } else {
              return [field, 'ASC'];
            }
          });
          this.model = this.model.findAll({
            order: orderCriteria,
          });
        }
        return this;
      }
  
      limitFields() {
        if (this.queryStr.fields) {
          const fields = this.queryStr.fields.split(',').join(' ');
          this.model = this.model.findAll({
            attributes: fields,
          });
        }
        else{
            this.model = this.model.findAll();
        }
        return this;
      }
      
      paginate() {
        const page = parseInt(this.queryStr.page, 10) || 1;
        const limit = parseInt(this.queryStr.limit, 10) || 10;
        const offset = (page - 1) * limit;
        this.model = this.model.findAll({
          offset,
          limit,
        });
        return this;
      }
    }

module.exports = ApiFeatures;