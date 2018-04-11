const SearchFilterOps = {
  Equals: '',
  GreaterThan: '_gte',
  LessThan: '_lte',
  GreaterThanOrEqual: '_gte',
  LessThanOrEqual: '_lte',
  Contains: '_like',
  StartsWith: '_like',
  EndsWith: '_like',
  Between: ''
}

export default {
  capFirstLetter (s) {
    return s && s[0].toUpperCase() + s.slice(1);
  },
  clearSearchFilters (searchVm) {
    if (searchVm) {
      if (searchVm.filters) delete searchVm.filters;

      Object.keys(searchVm).forEach(K => {
        if (searchVm[K]) {
          if (K !== "between") {
            Object.keys(searchVm[K]).forEach(prop => {
              searchVm[K][prop] = null;
            });
          } else {
            Object.keys(searchVm[K]).forEach(prop => {
              searchVm[K][prop]["former"] = 0;
              searchVm[K][prop]["latter"] = 0;
            });
          }
        }
      });
    }
  },
  buildSearchFilters (searchVm) {
    if (searchVm) {
      searchVm.filters = [];
      if (searchVm.contains) {
        Object.keys(searchVm.contains).forEach(k => {
          if (searchVm.contains.hasOwnProperty(k) && searchVm.contains[k]) {
            searchVm.filters.push({
              property: k,
              op: SearchFilterOps.Contains,
              val: searchVm.contains[k],
            });
          }
        });
      }

      if (searchVm.equals) {
        Object.keys(searchVm.equals).forEach(k => {
          if (searchVm.equals.hasOwnProperty(k) && searchVm.equals[k]) {
            searchVm.filters.push({
              property: k,
              op: SearchFilterOps.Equals,
              val: searchVm.equals[k],
            });
          }
        });
      }

      if (searchVm.startsWith) {
        Object.keys(searchVm.startsWith).forEach(k => {
          if (searchVm.startsWith.hasOwnProperty(k) && searchVm.startsWith[k]) {
            searchVm.filters.push({
              property: k,
              op: SearchFilterOps.StartsWith,
              val: searchVm.startsWith[k],
            });
          }
        });
      }

      if (searchVm.endsWith) {
        Object.keys(searchVm.endsWith).forEach(k => {
          if (searchVm.endsWith.hasOwnProperty(k) && searchVm.endsWith[k]) {
            searchVm.filters.push({
              property: k,
              op: SearchFilterOps.EndsWith,
              val: searchVm.endsWith[k],
            });
          }
        });
      }

      if (searchVm.between) {
        Object.keys(searchVm.between).forEach(k => {
          if (searchVm.between.hasOwnProperty(k) && searchVm.between[k]) {
            if (searchVm.between[k]["former"] > 0 || searchVm.between[k]["latter"] > 0) {
              if (searchVm.between[k]["former"] < searchVm.between[k]["latter"]) {
                searchVm.filters.push({
                  property: k,
                  op: SearchFilterOps.GreaterThanOrEqual,
                  val: searchVm.between[k]["former"],
                });
                searchVm.filters.push({
                  property: k,
                  op: SearchFilterOps.LessThanOrEqual,
                  val: searchVm.between[k]["latter"],
                });
              } else {
                searchVm.filters.push({
                  property: k,
                  op: SearchFilterOps.LessThanOrEqual,
                  val: searchVm.between[k]["former"],
                });
                searchVm.filters.push({
                  property: k,
                  op: SearchFilterOps.GreaterThanOrEqual,
                  val: searchVm.between[k]["latter"],
                });
              }
            }
          }
        });
      }
    }
  },
  buildJsonServerQuery (searchVm) {
    let filterQuery = "";
    if (searchVm && searchVm.filters) {
      searchVm.filters.forEach(f => {
        filterQuery += f.property;
        filterQuery += f.op;
        filterQuery += "=";
        filterQuery += f.val;
        filterQuery += "&";
      });
    }
    return filterQuery;
  },
  getRootComponent (vueComponent) {
    const root = null;
    if (vueComponent && vueComponent._isVue) {
      if (vueComponent.isRootComponent) {
        return vueComponent;
      } else if (vueComponent.$parent) {
        return this.getRootComponent(vueComponent.$parent);
      } else {
        return root;
      }
    } else {
      return root;
    }
  },
};
