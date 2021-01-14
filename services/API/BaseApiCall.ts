/**
 * Abstract class for all api calls operations.
 *
 * @abstract
 * @class BaseApiCall
 */

import { store } from "services/appStore"
import { navigate } from "gatsby"
import {
  HTTP_STATUS,
  UNAUTHORIZED_HTTP_STATUS_CODE,
  BASE_API_URL,
} from "services/API/BaseApiConstants"
import { Config } from "../../../config/config"
import {
  httpError,
  httpResponse,
  httpCompleted,
  httpInProgress,
  notification,
} from "services/globalActions"

abstract class BaseApiCall {
  baseUrl: string

  constructor() {
    this.baseUrl = BASE_API_URL
    console.log("in base api call constructor", this.baseUrl)
  }
  /**
   * httpCore API call
   *
   * @memberof BaseApiCall
   */

  httpCore() {
    return fetch
  }

  /**
   * get session headers
   *
   * @memberof BaseApiCall
   */

  getSessionHeader() {
    let headers = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    let isLoggedIn = JSON.parse(sessionStorage.getItem("token"))
    if (isLoggedIn !== false) {
      headers["x-auth-token"] = JSON.parse(sessionStorage.getItem("token"))
      // headers["x-auth-token"] = sessionStorage.getItem("token")
    }

    return headers
  }

  /**
   * GET API call
   *
   * @memberof BaseApiCall
   */

  getURL(url: string) {
    if (url.indexOf("http") === -1) return this.baseUrl + url

    return url
  }

  get(
    url_route: RequestInfo,
    cb: ((value: any) => any) | null | undefined,
    error: any
  ) {
    const url = this.getURL(url_route)
    let request =  this.httpCore()(url, {
      method: "get",
      headers: url_route != url ? this.getSessionHeader() : {},
    })
      .then(this.onResponse)
      .then(cb)
      .catch(this.onError)

      if(error){
        request = request.catch(error)
      }
      
      return request.finally(this.onComplete)
  }

  downloadGet(
    url_route: RequestInfo,
    cb: ((value: any) => any) | null | undefined,
    error: any
  ) {
    const url = this.getURL(url_route)
    return this.httpCore()(url, {
      method: "get",
      headers: url_route != url ? this.getSessionHeader() : {},
    })
      .then(cb)
      .catch(this.onError)
      .finally(this.onComplete)
  }

  post(url: string, postData: any, cb: any) {
    url = this.getURL(url)
    return this.httpCore()(url, {
      method: "post",
      headers: this.getSessionHeader(),
      body: JSON.stringify(postData),
    })
      .then(this.onResponse)
      .then(cb)
      .catch(this.onError)
      .finally(this.onComplete)
  }

  delete(url: string, cb: any) {
    url = this.baseUrl + url
    return this.httpCore()(url, {
      method: "DELETE",
      headers: this.getSessionHeader(),
    })
      .then(this.onResponse)
      .then(cb)
      .catch(this.onError)
      .finally(this.onComplete)
  }

  put(url: string, payload: any, cb: any) {
    url = this.baseUrl + url
    return this.httpCore()(url, {
      method: "PUT",
      headers: this.getSessionHeader(),
      body: JSON.stringify(payload),
    })
      .then(this.onResponse)
      .then(cb)
      .catch(this.onError)
      .finally(this.onComplete)
  }

  putAttachment(url: string, body: any, cb: any) {
    url = this.baseUrl + url
    let headers = this.getSessionHeader()
    delete headers["content-type"]
    return this.httpCore()(url, {
      method: "PUT",
      headers: headers,
      body: body,
    })
      .then(this.onResponse)
      .then(cb)
      .catch(this.onError)
      .finally(this.onComplete)
  } 


  onResponse(response: any) {
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      if (response.status === UNAUTHORIZED_HTTP_STATUS_CODE) {
        navigate("/logout")
      }
      throw new Error(HTTP_STATUS[response.status])
    }
  }

  onPutResponse(response: any) {
    if (response.ok) {
      return Promise.resolve('Success')
    } else {
      if (response.status === UNAUTHORIZED_HTTP_STATUS_CODE) {
        navigate("/logout")
      }
      throw new Error(HTTP_STATUS[response.status])
    }
  }

  onError(e: { message: string }) {
    store.store.dispatch(notification(true, e.message, "error"))
    return Promise.reject(e.message)
  }

  onComplete() {
    console.log("onComplete")
    return
  }
}

export default BaseApiCall