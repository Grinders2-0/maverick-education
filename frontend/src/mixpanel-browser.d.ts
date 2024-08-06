declare module "mixpanel-browser" {
  export interface Mixpanel {
    init(token: string, config?: any): void;
    track(event: string, properties?: any): void;
    // Add more methods and properties as needed based on your use
  }

  const mixpanel: Mixpanel;
  export default mixpanel;
}
