import db from "./demo-data"

let ds = ds || Object.assign({}, db)

function getModel (action) {
  if (action.includes('?') && action.includes('/')) {
    return action.indexOf('?') > action.indexOf('/') ? action.substring(0, action.indexOf('/')) : action.substring(0, action.indexOf('?'))
  } else {
    return action.includes('?') ? action.substring(0, action.indexOf('?')) : action.substring(0, action.indexOf('/'))
  }
}

function getId (action, model) {
  action = action.substr(model.length + 1)
  return action.length > 0 && (action.includes('?') ? action.substring(0, action.indexOf('?')) : action)
}

function getExpand (action, model) {
  action = action.substr(action.indexOf('?'))
  return action.includes('_expand') ? (
    action.includes('&') ?
      action.substring('_expand='.length + 1, action.indexOf('&')) :
      action.substring('_expand='.length + 1)) : undefined
}

function getEmbed (action, model) {
  return action.includes('?') ? action.substring(action.indexOf('/'), action.indexOf('?')) : action.substring(action.indexOf('/'))
}


export default {
  getData (action) {

    return new Promise(function (resolve, reject) {
      const model = getModel(action)
      const idStr = getId(action, model)
      const id = isNaN(idStr) ? undefined : parseInt(idStr)
      let exp = getExpand(action, model)
      const expandModel = exp ? exp === "category" ? "categories" : exp + "s" : exp
      const embed = getEmbed(action)
      console.log(model)
      let result
      let expand, expandId
      console.log(expandModel)
      if (model in ds) {
        if (id) {
          result = ds[model][ds[model].findIndex(d => d.id === id)]

          if (expandModel) {
            expand = expandModel === "categories" ? "category" : expandModel.substr(0, expandModel.length - 1)
            expandId = result[expand + "Id"]
            result[expand] = ds[expandModel][ds[expandModel].findIndex(d => d.id === expandId)]
          }
        } else {
          result = ds[model].map(m => {
            if (expandModel) {
              expand = expandModel === "categories" ? "category" : expandModel.substr(0, expandModel.length - 1)
              expandId = m[expand + "Id"]
              m[expand] = ds[expandModel][ds[expandModel].findIndex(d => d.id === expandId)]
            }
            return m
          })
        }
      }
      setTimeout(resolve, 200, { data: result })
    });
  },
  postData (action, data) {
    return new Promise(function (resolve, reject) {
      const model = getModel(action)
      data.id = ds[model] + 1
      ds[model].push(data)
      setTimeout(resolve, 200, { data: data })
    })
  },
  putData (action, data) {
    return new Promise(function (resolve, reject) {
      const model = getModel(action)
      const idx = ds[model].findIndex(d => d.id === data.id)
      ds[model][idx] = Object.assign({}, data)
      setTimeout(resolve, 200, { data: data })
    })
  },
  deleteData (action) {
    return new Promise(function (resolve, reject) {
      const model = getModel(action)
      const id = getId()
      id && ds[model].splice(ds[model].findIndex(d => d.id === id))
      setTimeout(resolve, 200, { status: 200 })
    })
  },
  login (action, data) {
    ds = ds || Object.assign({}, db)
    return new Promise(function (resolve, reject) {
      const { access_token, user } = ds.token
      setTimeout(resolve, 200, {
        data: {
          access_token,
          user
        }
      })
    })
  }
}

