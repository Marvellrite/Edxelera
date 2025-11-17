declare module "next-pwa" {
  interface PWAConfig {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: (string | RegExp)[];
    fallbacks?: Record<string, string>;
    runtimeCaching?: any[];
    reloadOnOnline?: boolean;
  }

  function nextPwa(config: PWAConfig): (nextConfig: any) => any;

  export default nextPwa;
}