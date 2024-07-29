import axios, {AxiosError, AxiosResponse, RawAxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import {mixpanelTrack, recordError} from '../helpers/Utility';
let incrementId = -1;
let controllerArr = [];

const API_KEY =
  Config.PART1 +
  '-' +
  Config.PART2 +
  '-' +
  Config.PART3 +
  '-' +
  Config.PART4 +
  '-' +
  Config.PART5;

/**
 * @param {AxiosResponse} response
 * @param {number} controllerId
 */
const OnSuccess = function (response, controllerId) {
  if (controllerId) {
    controllerArr[controllerId] = null;
  }
  return response.data;
};

/**
 * @param {AxiosError} error
 * @param {number} controllerId
 */
const OnError = function (error, controllerId) {
  if (error?.code !== 'ERR_CANCELED') {
    recordError(error);
  }
  if (controllerId) {
    controllerArr[controllerId] = null;
  }
  if (error.response) {
    console.debug('Status:', error.response);
    console.debug('Data: ', error.response.data);
    console.debug('Headers:', error.response.headers);
    mixpanelTrack('Api Error', {code: error.code, status: error.status});
    throw error?.response?.data;
  } else {
    console.debug('Error Message: ', error.message);
    console.debug('Error code: ', error.code);
    if (error?.code == 'ERR_NETWORK') {
      mixpanelTrack('Network Error', {code: error.code, status: error.status});
      throw error;
    }
    mixpanelTrack('Api Error', {code: error.code, status: error.status});
    throw error;
  }
};

const defaultHeader = {
  'X-API-KEY': API_KEY,
};

/**
 * @param {RawAxiosRequestConfig} option
 */
export default async function (option) {
  try {
    const APIClient = axios.create({headers: defaultHeader});
    const r = await APIClient(option);
    return OnSuccess(r);
  } catch (e) {
    return OnError(e);
  }
}

export const AbortableAPI = async function (option) {
  incrementId++;
  const ID = incrementId;
  const controller = new AbortController();
  controllerArr[ID] = controller;
  const APIClient = axios.create({
    signal: controller.signal,
    headers: defaultHeader,
  });
  try {
    const r = await APIClient(option);
    return OnSuccess(r, ID);
  } catch (e) {
    return OnError(e, ID);
  }
};

export const abortAPIs = () => {
  try {
    controllerArr.forEach(controller => {
      try {
        if (controller) {
          controller?.abort();
        }
      } catch (error) {
        console.log('abort API ERROR inside', error);
      }
    });
    controllerArr = [];
    incrementId = -1;
  } catch (error) {
    console.log('abort API ERROR out', error);
  }
};
