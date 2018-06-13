import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import Cmp, { CMP_GLOBAL_NAME } from './cmp';
import { readVendorConsentCookie, readPublisherConsentCookie } from './cookie/cookie';
import { fetchVendorList, fetchPurposeList } from './vendor';
import log from './log';
import pack from '../../package.json';
import config from './config';
import {getColorCSS} from './customizeColor';
import event_logger from './event_logger';

const CMP_VERSION = 1;
const CMP_ID = 1;
const COOKIE_VERSION = 1;

export function init(configUpdates) {
	config.update(configUpdates);
	log.debug('Using configuration:', config);

	// Fetch the current vendor consent before initializing
	return readVendorConsentCookie()
		.then(vendorConsentData => {
      let publisherConsentData = readPublisherConsentCookie();
      let showUI  = true;
      if (typeof vendorConsentData != 'undefined' || typeof publisherConsentData != 'undefined') {
         showUI = false;
      }

			// Initialize the store with all of our consent data
			const store = new Store({
				cmpVersion: CMP_VERSION,
				cmpId: CMP_ID,
        color: config.color,
				cookieVersion: COOKIE_VERSION,
				vendorConsentData,
        publisherName: config.publisherName,
        publisherPurposeIds: config.publisherPurposeIds,
				publisherConsentData: readPublisherConsentCookie()
			});

      console.log(store);

			// Pull queued command from __cmp stub
			const {commandQueue = []} = window[CMP_GLOBAL_NAME] || {};

			// Replace the __cmp with our implementation
			const cmp = new Cmp(store);

			// Expose `processCommand` as the CMP implementation
			window[CMP_GLOBAL_NAME] = cmp.processCommand;

      // customize color if configured
      if (store.color && store.color != "#2e7d32") {
        var css = getColorCSS(store.color);
        var styleNode = document.createElement('style');
        styleNode.type = "text/css";
        if (styleNode.styleSheet){
          styleNode.styleSheet.cssText = css;
        } else {
          styleNode.appendChild(document.createTextNode(css));
        }
        document.head.append(styleNode);
      }
			// Render the UI
			const App = require('../components/app').default;
      if (showUI) {
                          event_logger("cmp_opened");
			  render(<App store={store} notify={cmp.notify} />, document.body);
      }

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version}`);
			cmp.isLoaded = true;
			cmp.notify('isLoaded');

			// Execute any previously queued command
			cmp.commandQueue = commandQueue;
			cmp.processCommandQueue();

			// Request lists
			return Promise.all([
				fetchVendorList().then(store.updateVendorList),
				fetchPurposeList().then(store.updateCustomPurposeList)
			]).then(() => {
				cmp.cmpReady = true;
				cmp.notify('cmpReady');
			}).catch(err => {
				log.error('Failed to load lists. CMP not ready', err);
			});
		})
		.catch(err => {
			log.error('Failed to load CMP', err);
		});
}


