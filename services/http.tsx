import { store } from "./appStore"
import { navigate } from "gatsby"
import {
  httpError,
  httpResponse,
  httpCompleted,
  httpInProgress,
  notification,
} from "./globalActions"
import uuid from "uuid"
import { BASE_API_URL } from "./API/BaseApiConstants";

export function sessionDataManager(action, key, value) {
  // const HOST = "http://182.18.157.215:9000/api/"

  const HOST = BASE_API_URL

  const settings = {
    LoginURL: HOST + "authenticate",
    SubjectsURL: HOST + "subjects",
    SearchURL: HOST + "a4/executequery",
    SearchURLWithoutSession: HOST + "a4/nlpquery",
    StartSessionURL: HOST + "a4/beginsession",
    ClustersURL: HOST + "clusters",
    ElementClustersURL: HOST + "elementclusters",
    ElementSubClustersURL: HOST + "elementsubclusters/",
    dbTypes: HOST + "databasetypes",
    databases: HOST + "databasetypes/__databaseType__/databases",
    databaseSubjects: HOST + "databases/__database__/subjects",
    clusterSubjects: HOST + "clusters/__clusterId__/subjects",
    clusterElements: HOST + "elementclusters/__clusterId__/clusters",
    clusterElementTree: HOST + "clusters/__subjectId__/subjects/__clusterId__",
    clusterElementDetail:
      HOST +
      "elementsubclusters/__clusterId__/__elementClusterId__/elementsubclusterdetailrange",
    clusterElementRules:
      HOST + "elementsubclusters/__clusterId__/__elementClusterId__/rules",
    fileUploadClusterElement:
      HOST +
      "elementclusters/__clusterId__/__elementClusterId__/elementsubclusters/__elementSubClusterId__/upload",
    rangeUploadClusterElement:
      HOST +
      "elementclusters/__clusterId__/__elementClusterId__/elementsubclusters/__elementSubClusterId__",
    Database: HOST + "databases",
    LinkedCluster: HOST + "linkedclusters",
    NLPLoading: HOST + "a4/nlploading",
    CreateDataSet: HOST + "a4/createdatasetindatabase",
    MakeGloabl: HOST + "masterdata/",
    postSavedQuery: HOST + "a4/savequery",
    getAllSavedQuery : HOST + "a4/getallqueries",
    getPublicSavedQuery : HOST + "a4/getpublicquery",
    convertToPublic: HOST + "a4/convertprivatetopublic"
  }

  switch (action) {
    case "setting":
      return settings[key]
    case "set":
      return sessionStorage.setItem(key, JSON.stringify(value))
    case "isLoggedIn":
      let session = JSON.parse(sessionStorage.getItem("token"))
      return session !== null ? session : false
    case "delete":
      return sessionStorage.removeItem(key)
    case "clearAll":
      return sessionStorage.clear()
    default:
      return sessionStorage.getItem(key)
  }
}

function httpCore() {
  //store.store.dispatch(httpInProgress())
  return fetch
}

function onComplete() {
  //store.store.dispatch(httpCompleted())
  var t = "ok"
  return
}

function onError(e) {
  store.store.dispatch(notification(true, e.message, "error"))
  //store.store.dispatch(httpError(e))
  //store.store.dispatch(notification('error', 'Something wrong'))
}

function httpCodehandler(httpCode)

function onResponse(response: any) {
  //store.store.dispatch(httpResponse(response))
  if (response.status === 401) {
    setTimeout(() => {
      navigate("/logout")
    }, 500)
    throw new Error("Action is unauthorized. Logging out...")
  } else if (response.status === 422) {
    throw new Error("Form input is not valide. Unprocessable Entity")
  } else if (response.status === 409) {
    throw new Error("Api Conflict")
  } else if (response.status === 500) {
    throw new Error("Internal Server error")
  }

  return response.json()
}

function getSessionHeader() {
  let headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
  if (sessionDataManager("isLoggedIn") !== false) {
    headers["x-auth-token"] = sessionDataManager("isLoggedIn")
  }

  return headers
}

export function post(url, body, cb) {
  return httpCore()(url, {
    method: "post",
    headers: getSessionHeader(),
    body: JSON.stringify(body),
  })
    .then(onResponse)
    .then(cb)
    .catch(onError)
    .finally(onComplete)
}

export function get(url, cb) {
  return httpCore()(url, {
    method: "get",
    headers: getSessionHeader(),
  })
    .then(onResponse)
    .then(cb)
    .catch(onError)
    .finally(onComplete)
}

export function put(url, body, cb) {
  return httpCore()(url, {
    method: "PUT",
    headers: getSessionHeader(),
    body: JSON.stringify(body),
  })
    .then(onResponse)
    .then(cb)
    .catch(onError)
    .finally(onComplete)
}

export function putAttachment(url, body, cb) {
  let headers = getSessionHeader()
  delete headers["content-type"]
  return httpCore()(url, {
    method: "PUT",
    headers: headers,
    body: body,
  })
    .then(onResponse)
    .then(cb)
    .catch(onError)
    .finally(onComplete)
}

export function remove(url: string, cb: any) {
  return httpCore()(url, {
    method: "DELETE",
    headers: getSessionHeader(),
  })
    .then(onResponse)
    .then(cb)
    .catch(onError)
    .finally(onComplete)
}

export function login(body, cb) {
  let postURL = sessionDataManager("setting", "LoginURL")
  return post(postURL, body, cb)
}

export function getSubjects(cb) {
  let subjectsURL = sessionDataManager("setting", "SubjectsURL")
  return get(subjectsURL, cb)
}

export function getClusters(subjectId, cb) {
  let clustersURL =
    sessionDataManager("setting", "ClustersURL") + "/" + subjectId + "/subjects"
  return get(clustersURL, cb)
}

export function getElementClusters(subjectId, cb) {
  let elementClustersURL =
    sessionDataManager("setting", "ElementClustersURL") +
    "/" +
    subjectId +
    "/clusters"
  return get(elementClustersURL, cb)
}

export function getElementSubClusters(clusterId, id, cb) {
  let elementSubClustersURL =
    sessionDataManager("setting", "ElementSubClustersURL") +
    clusterId +
    "/elementclusters/" +
    id
  return get(elementSubClustersURL, cb)
}

export function loadSearchData(inputNLP, loadSessionObj, cb) {
  var data = {
    inputNLP: inputNLP,
    messageCode: loadSessionObj["messageCode"],
    nodeAddress: loadSessionObj["nodeAddress"],
    port: loadSessionObj["port"],
    sessionId: loadSessionObj["sessionId"],
    status: loadSessionObj["status"],
  }

  let postURL = sessionDataManager("setting", "SearchURL")
  return post(postURL, data, cb)
}

export function searchWithoutSession(inputNLP, cb) {
  var data = {
    inputNLP: inputNLP,
  }
  let postURL = sessionDataManager("setting", "SearchURLWithoutSession")
  return post(postURL, data, cb)
}

export function loadSessionData(cb) {
  let getURL = sessionDataManager("setting", "StartSessionURL")
  return get(getURL, cb)
}

export function getDatabaseTypes(cb) {
  let dbTypes = sessionDataManager("setting", "dbTypes")
  return get(dbTypes, cb)
}

export function getDatabases(dbTypeId, cb) {
  let databaseURL = sessionDataManager("setting", "databases")
  databaseURL = databaseURL.replace("__databaseType__", dbTypeId)
  return get(databaseURL, cb)
}

export function getDatabaseSubjects(dbId, cb) {
  let dbSubURL = sessionDataManager("setting", "databaseSubjects")
  dbSubURL = dbSubURL.replace("__database__", dbId)
  return get(dbSubURL, cb)
}

export function getClusterSubjects(clusterID, cb) {
  let clusterURL = sessionDataManager("setting", "clusterSubjects")
  clusterURL = clusterURL.replace("__clusterId__", clusterID)
  return get(clusterURL, cb)
}

export function getClusterElements(subjectId, cb) {
  let clusterURL = sessionDataManager("setting", "clusterElements")
  clusterURL = clusterURL.replace("__clusterId__", subjectId)
  return get(clusterURL, cb)
}

export function getForeignKeyClusterElements(subjectId, cb) {
  let clusterURL = sessionDataManager("setting", "clusterElements")
  clusterURL = clusterURL.replace("__clusterId__", subjectId)
  return get(clusterURL, cb)
}

export function getClusterElementTree(subjectId, clusterId, cb) {
  let clusterURL = sessionDataManager("setting", "clusterElementTree")
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  clusterURL = clusterURL.replace("__subjectId__", subjectId)
  return get(clusterURL, cb)
}

export function getElementClusterDetail(
  elementClusterId: string,
  clusterId: string,
  cb: any
) {
  let clusterURL = sessionDataManager("setting", "clusterElementDetail")
  clusterURL = clusterURL.replace("__elementClusterId__", elementClusterId)
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  return get(clusterURL, cb)
}

export function getElementClusterDetailUploadURL(
  elementClusterId: string,
  clusterId: string,
  elementSubClusterId: string
) {
  let url = sessionDataManager("setting", "fileUploadClusterElement")
  url = url.replace("__elementClusterId__", elementClusterId)
  url = url.replace("__clusterId__", clusterId)
  url = url.replace("__elementSubClusterId__", elementSubClusterId)
  return url
}

export function getElementClusterDetailRangeUploadURL(
  elementClusterId: string,
  clusterId: string,
  elementSubClusterId: string
) {
  let url = sessionDataManager("setting", "rangeUploadClusterElement")
  url = url.replace("__elementClusterId__", elementClusterId)
  url = url.replace("__clusterId__", clusterId)
  url = url.replace("__elementSubClusterId__", elementSubClusterId)
  return url
}

export function getElementSubClusterDetailRangeURL(
  clusterId: any,
  elementClusterId: any,
  elementClusterSubElementId: any
) {
  let clusterURL = sessionDataManager("setting", "clusterElementDetail")
  clusterURL = clusterURL.replace("__elementClusterId__", elementClusterId)
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  clusterURL = clusterURL + "/" + elementClusterSubElementId

  return clusterURL
}

export function getElementSubClusterDetailRulesURL(
  clusterId: any,
  elementClusterId: any,
  elementClusterSubElementId: any
) {
  let clusterURL = sessionDataManager("setting", "clusterElementRules")
  clusterURL = clusterURL.replace("__elementClusterId__", elementClusterId)
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  clusterURL = clusterURL + "/" + elementClusterSubElementId

  return clusterURL
}

export function deleteElementSubClusterDetailRange(
  clusterId: any,
  elementClusterId: any,
  elementClusterSubElementId: any,
  elementSubClusterDetailRangeElement: any
) {
  let clusterURL = sessionDataManager("setting", "clusterElementDetail")
  clusterURL = clusterURL.replace("__elementClusterId__", elementClusterId)
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  clusterURL =
    clusterURL +
    "/" +
    elementClusterSubElementId +
    "/" +
    elementSubClusterDetailRangeElement.id
  return clusterURL
  // return null
}

export function deleteElementSubClusterDetailRule(
  clusterId: any,
  elementClusterId: any,
  elementClusterSubElementId: any,
  elementSubClusterDetailRuleElement: any
) {
  let clusterURL = sessionDataManager("setting", "clusterElementRules")
  clusterURL = clusterURL.replace("__elementClusterId__", elementClusterId)
  clusterURL = clusterURL.replace("__clusterId__", clusterId)
  clusterURL =
    clusterURL +
    "/" +
    elementClusterSubElementId +
    "/" +
    elementSubClusterDetailRuleElement.id
  return clusterURL
}

export function getTreeData() {
  let allDataMappingWithIds = {}
  let allData = {
    name: "DB",
    plusIcon: false,
    dType: "main",
    key: uuid(),
  }
  return getDatabaseTypes(databaseTypes => {
    allData["children"] = databaseTypes

    //get all databasetype databases
    let dbtPromises = []
    allData["children"].forEach(dbType => {
      dbType["name"] = dbType.databaseType
      dbType["key"] = uuid()
      dbType["plusIcon"] = true
      dbType["dType"] = "dbTypes"
      allDataMappingWithIds[dbType.id] = dbType

      dbtPromises.push(
        new Promise((s, f) => {
          getDatabases(dbType.id, dbData => {
            let dbSubPromises = []
            dbData.forEach(dbD => {
              dbD["name"] = dbD.databaseName
              dbD["dType"] = "db"
              dbD["plusIcon"] = true
              dbD["key"] = uuid()
              allDataMappingWithIds[dbD.id] = dbD
              dbSubPromises.push(
                new Promise((ss, ff) => {
                  getDatabaseSubjects(dbD.id, dbSubData => {
                    dbD["children"] = dbSubData.map(dd => {
                      dd["name"] = dd.subjectName
                      dd["dType"] = "subject"
                      dd["plusIcon"] = true
                      dd["key"] = uuid()
                      dd["children"] = []
                      allDataMappingWithIds[dd.id] = dd
                      return dd
                    })
                    ss()
                  })
                })
              )
            })
            Promise.all(dbSubPromises).then(() => {
              dbType["children"] = dbData
              s()
            })
          })
        })
      )
    })

    return Promise.all(dbtPromises).then(() => {
      return { allData, allDataMappingWithIds }
    })
  })
}
export function postSavedQuery(dataObj: any, cb) {
  let postURL = sessionDataManager("setting", "postSavedQuery")
  return post(postURL, dataObj, cb)
}
export function getAllSavedQuery(dataObj: any, cb) {
  let postURL = sessionDataManager("setting", "getAllSavedQuery")
  return post(postURL, dataObj, cb)
}
export function getPublicSavedQuery(cb) {
  let postURL = sessionDataManager("setting", "getPublicSavedQuery")
  return post(postURL, {}, cb)
}
export function convertToPublic(dataObj: any, cb) {
  let postURL = sessionDataManager("setting", "convertToPublic")
  return post(postURL, dataObj, cb)
}
