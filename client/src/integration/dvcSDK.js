let data, response;

class DvcSDK {
  constructor() {
    window.onfocus = () => {
      if (this._token_expired()) {
        if (this._get_persist_class_value("TOKEN")) {
          this._refresh_token_helper();
        } else if (this._get_persist_class_value("SDK_TOKEN")) {
          this._event_emitter("sdk-token-error", {
            data: data,
            response: response,
            function: null,
          });
        }
      }
    };
  }

  _get_domain() {
    let val = localStorage.getItem("SDK_DOMAIN");
    if (val) {
      return val;
    }
    throw new Error(
      "Domain Required to Initialize SDK, Please try setting Domain using setDomain prop.",
    );
  }

  _get_show_feedback() {
    let val = localStorage.getItem("SDK_SHOW_FEEDBACK");
    if (val) {
      return val;
    }
    return false;
  }

  _set_persist_class_value(key, token) {
    localStorage.setItem(key, token);
  }

  _get_persist_class_value(key) {
    return localStorage.getItem(key);
  }

  _token_expired = () => {
    let token = this._get_persist_class_value("TOKEN");
    let sdk_token = this._get_persist_class_value("SDK_TOKEN");
    if (token || sdk_token) {
      const j = this._parseJwt(token ? token : sdk_token);
      const cur_time = Math.floor(Date.now() / 1000) + 19800;
      const exp_time = j["exp"] + 19800;
      return exp_time < cur_time;
    }
    console.log("No Token to Validate !");
    return false;
  };

  _parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  };

  _isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  _json_to_url_encode = (json) => {
    let q = "?";
    Object.keys(json).forEach((k, i) => {
      q = q + k + "=" + json[k] + "&";
    });
    return q.substring(0, q.length - 1);
  };

  _get_response_data = async (response) => {
    let data;
    const response_data = await response.text();
    if (this._isJsonString(response_data)) {
      data = JSON.parse(response_data);
    } else {
      data = { data: response_data };
    }
    return data;
  };

  _encodeJwtConfig = (data) => {
    const token = this._get_persist_class_value("TOKEN");
    const sdk_token = this._get_persist_class_value("SDK_TOKEN");
    let modified_meeting_data = this._updateUrlWithJwt(
      data,
      token ? token : sdk_token,
    );
    modified_meeting_data["web_client_uri"] =
      modified_meeting_data["web_client_uri"] +
      `&config.inviteViaDvcEnabled=true&config.joinPageFlowEnabled=false&config.callMode=true&config.showFeedbackPage=${this._get_show_feedback()}&config.startWithAudioMuted=false`;
    return modified_meeting_data;
  };

  _updateQueryParams = (uri, key, value) => {
    if (!Array.isArray(uri)) {
      var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
      if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
      } else {
        var hash = "";
        if (uri.indexOf("#") !== -1) {
          hash = uri.replace(/.*#/, "#");
          uri = uri.replace(/#.*/, "");
        }
        var separator = uri.indexOf("?") !== -1 ? "&" : "?";
        return uri + separator + key + "=" + value + hash;
      }
    }
  };

  _updateUrlWithJwt = (apiResponse, token) => {
    for (const [key, value] of Object.entries(apiResponse)) {
      if (key !== "meeting_id" && key !== "meeting_info_id") {
        apiResponse[key] = this._updateQueryParams(value, "jwt", token);
      }
    }
    return apiResponse;
  };

  _objectWithoutProperties = (obj, keys) => {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  };

  _event_emitter = (event_name, data) => {
    window.dispatchEvent(
      new CustomEvent(event_name, {
        detail: data,
      }),
    );
  };

  _reconcile_api = (reconcile_url, payload) => {
    return this._api_handler(reconcile_url, "POST", payload, false);
  };

  _missed_call_api = (missed_url, payload) => {
    return this._api_handler(missed_url, "GET", payload, true);
  };

  _contacts_api = (contacts_url, payload) => {
    return this._api_handler(contacts_url, "GET", payload, true);
  };

  _meetings_api = (meeting_request_url, payload) => {
    return this._api_handler(meeting_request_url, "POST", payload, true);
  };

  _update_meeting_status_api = (update_status_url, payload) => {
    return this._api_handler(update_status_url, "POST", payload, true);
  };

  _call_api = (meeting_call_url, payload) => {
    return this._api_handler(meeting_call_url, "POST", payload, true);
  };

  _join_missed_meetings_api = (request_url, payload) => {
    return this._api_handler(request_url, "POST", payload, true);
  };

  _join_meetings_api = (meeting_url, payload) => {
    return this._api_handler(meeting_url, "GET", {}, true);
  };

  _refresh_api = (refresh_url, payload) => {
    return this._api_handler(refresh_url, "POST", payload, false);
  };

  _response_handler = async (
    response,
    data,
    function_trigger,
    success_handler,
    returner,
  ) => {
    if (response.status === 200 || response.status === 204) {
      if (success_handler && returner) return success_handler();
      else if (success_handler) success_handler();
      return Promise.resolve({
        response: response,
        data: data,
      });
    } else if (response.status === 401) {
      let auth = false;
      if (!this._get_persist_class_value("SDK_TOKEN")) {
        auth = await this._refresh_token_helper(function_trigger);
      } else {
        console.log("SDK Error Event Triggered ");
        this._event_emitter("sdk-token-error", {
          data: data,
          response: response,
          function: function_trigger,
        });
      }
      if (function_trigger && auth) {
        return function_trigger();
      }
    }

    return Promise.reject({ response: response, data: data });
  };

  _api_handler = (url, method, payload, authorization) => {
    let endpoint_url = this._get_domain();
    let headers = {
      "Content-Type": "application/json",
    };
    if (authorization) {
      if (this._get_persist_class_value("SDK_TOKEN")) {
        headers["X-DVC-Tenant-SDK-Key"] =
          this._get_persist_class_value("SDK_TOKEN");
      } else {
        headers["Authorization"] =
          "Bearer " + this._get_persist_class_value("TOKEN");
      }
    }
    let config = {
      method: method,
      headers: headers,
    };
    if (method === "GET") url = url + this._json_to_url_encode(payload);
    else
      Object.assign(config, payload ? { body: JSON.stringify(payload) } : null);
    if (!authorization) delete config["headers"]["Authorization"];
    return fetch(endpoint_url + url, config);
  };

  _refresh_token_helper = async (function_trigger) => {
    const url = "/auth/api/v1/refresh-token";
    const response = await this._refresh_api(url, {
      refreshToken: this._get_persist_class_value("REFRESH_TOKEN"),
    });
    const data = await this._get_response_data(response);
    const success_handler = () => {
      this._set_persist_class_value("TOKEN", data["token"]);
      this._set_persist_class_value("REFRESH_TOKEN", data["refreshToken"]);
      console.log("Refreshed JWT");
    };

    let response_code_str = response.status.toString().charAt(0);
    if (response_code_str === "4" || response_code_str === "5") {
      this._event_emitter("refresh-token-error", {
        data: data,
        response: response,
        function: function_trigger ? function_trigger : null,
      });
      return false;
    }

    const flat_response = await this._response_handler(
      response,
      data,
      null,
      success_handler,
    );
    return flat_response;
  };

  _get_missed_call_helper = async (payload) => {
    const url = "/account/api/v1/meetings/call/missed";
    const response = await this._missed_call_api(url, payload);
    const data = await this._get_response_data(response);
    const function_trigger = () => {
      return this._get_missed_call_helper(payload);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
      null,
      false,
    );
    return flat_response;
  };

  _get_contacts_helper = async (payload) => {
    const url = "/account/api/v1/tenants/user/usernames";
    const response = await this._contacts_api(url, payload);
    const data = await this._get_response_data(response);
    const function_trigger = () => {
      return this._get_contacts_helper(payload);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
    );
    return flat_response;
  };

  _get_call_url_helper = async (params) => {
    const url = "/meeting/api/v1/meeting/call";
    const payload = {
      meeting_info_id: params["meeting_info_id"],
      moderator_incoming_call: params["moderator_incoming_call"],
      users: { dvc: params["dvc_users"], telephony: params["telephony_users"] },
    };
    const response = await this._call_api(url, payload);
    const data = await this._get_response_data(response);
    const function_trigger = () => {
      return this._get_call_url_helper(params);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
    );
    return flat_response;
  };

  _get_meeting_url_helper = async (params) => {
    const url = "/meeting/api/v1/meeting";
    const payload = this._objectWithoutProperties(params, [
      "dvc_users",
      "telephony_users",
      "moderator_incoming_call",
    ]);
    const response = await this._meetings_api(url, payload);
    let data = await this._get_response_data(response);
    const success_handler = () => {
      data = this._encodeJwtConfig(data);
    };
    const function_trigger = () => {
      return this._get_meeting_url_helper(params);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
      success_handler,
    );
    return flat_response;
  };

  _join_missed_meeting_helper = async (payload) => {
    const url =
      "/meeting/api/v1/meeting/" + payload["meeting_info_id"] + "/join-missed";
    const response = await this._join_missed_meetings_api(url, payload);
    let data = await this._get_response_data(response);
    const success_hanlder = () => {
      data = this._encodeJwtConfig(data);
    };
    const function_trigger = () => {
      return this._join_missed_meeting_helper(payload);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
      success_hanlder,
    );
    return flat_response;
  };

  _join_meeting_helper = async (payload) => {
    let url = "/meeting/api/v1/join/" + payload["meeting_id"];
    if (payload["include_audio"]) {
      url += "?include_audio=" + payload["include_audio"];
    }
    if (payload["include_video"]) {
      url += "&include_video=" + payload["include_video"];
    }
    if (payload["mute_audio_on_start"]) {
      url += "&mute_audio_on_start=" + payload["mute_audio_on_start"];
    }
    if (payload["end_meeting_redirect_url"]) {
      url += "&end_meeting_redirect_url=" + payload["end_meeting_redirect_url"];
    }
    if (payload["water_mark_image_png"]) {
      url += "&water_mark_image_png=" + payload["water_mark_image_png"];
    }
    if (payload["water_mark_image_link"]) {
      url += "&water_mark_image_link=" + payload["water_mark_image_link"];
    }
    if (payload["passcode"]) {
      url += "&passcode=" + payload["passcode"] + "&is_encrypted=true";
    }
    if (payload["display_name"]) {
      url += "&display_name=" + payload["display_name"];
    } else if (this._get_persist_class_value("SDK_USERNAME")) {
      url += "&display_name=" + this._get_persist_class_value("SDK_USERNAME");
    }
    const response = await this._join_meetings_api(url, payload);
    let data = await this._get_response_data(response);
    const success_hanlder = () => {
      data = this._encodeJwtConfig(data);
    };
    const function_trigger = () => {
      return this._join_meeting_helper(payload);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
      success_hanlder,
    );
    return flat_response;
  };

  _update_meeting_status = async (payload) => {
    const url = "/meeting/api/v1/meeting/call/status";
    const response = await this._update_meeting_status_api(url, payload);
    let data = await this._get_response_data(response);
    const function_trigger = () => {
      return this._update_meeting_status(payload);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      function_trigger,
    );
    return flat_response;
  };

  _get_reconcile_jwt_helper = async (token) => {
    const url = "/auth/api/v1/reconcile-jwt";
    const payload = {
      token: token,
      tenant_domain_name: this._get_domain().replace(/(^\w+:|^)\/\//, ""),
    };
    const response = await this._reconcile_api(url, payload);
    const data = await this._get_response_data(response);
    const success_handler = () => {
      console.log("Reconcile Token Received");
      this._set_persist_class_value("TOKEN", data["token"]);
      this._set_persist_class_value("REFRESH_TOKEN", data["refreshToken"]);
    };
    const flat_response = await this._response_handler(
      response,
      data,
      null,
      success_handler,
    );
    return flat_response;
  };

  startMeeting(payload) {
    return this._get_meeting_url_helper(payload);
  }

  inviteToMeeting(payload) {
    return this._get_call_url_helper(payload);
  }

  joinMeeting(payload) {
    return this._join_meeting_helper(payload);
  }

  joinMissedMeeting(payload) {
    return this._join_missed_meeting_helper(payload);
  }

  getMissedCall(payload) {
    return this._get_missed_call_helper(payload);
  }

  getContacts(payload) {
    return this._get_contacts_helper(payload);
  }

  updateMeetingStatus(payload) {
    return this._update_meeting_status(payload);
  }

  getReconcileJwt(token) {
    return this._get_reconcile_jwt_helper(token);
  }

  setSDKJwt(token) {
    this._set_persist_class_value("SDK_TOKEN", token);
  }

  setDomain(domain) {
    this._set_persist_class_value("SDK_DOMAIN", domain);
  }

  setShowFeedback(state) {
    this._set_persist_class_value("SDK_SHOW_FEEDBACK", state);
  }

  setUsername(username) {
    this._set_persist_class_value("SDK_USERNAME", username);
  }
}

window.DvcSDK = DvcSDK;
