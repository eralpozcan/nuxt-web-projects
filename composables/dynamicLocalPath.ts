
export function dynamicLocalPath(routePath: any,path: any) {
  return `_nuxt/pages${routePath}/assets/${path}`;
}
