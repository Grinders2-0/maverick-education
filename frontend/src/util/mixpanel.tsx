import mixpanel from "mixpanel-browser";
import { isObject } from "lodash";

// Initialize Mixpanel with your project token and automatic event tracking
mixpanel.init("517884ca60b6ea99a1202aa4b98afbc1", {
  track_pageview: true, // Automatically track page views
  debug: true, // Enable debug mode to log Mixpanel operations
});

export const mixpanelTrack = (eventName = "", properties = {}) => {
  if (eventName?.length > 0) {
    // Ensure properties is an object
    const props = isObject(properties) ? properties : { properties };

    // Log the event to the console for debugging
    console.log("[mixpanel] ", eventName, props);

    // Track the event using Mixpanel
    mixpanel.track(eventName, props);
  }
};
