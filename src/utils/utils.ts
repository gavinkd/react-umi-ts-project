export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function fixedBody() {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText +=
    'position:fixed;width:100%;top:-' + scrollTop + 'px;';
}

export function looseBody() {
  const body = document.body;
  body.style.position = '';
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
    body.style.top,
  );
  body.style.top = '';
}
