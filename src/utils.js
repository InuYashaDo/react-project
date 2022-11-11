export function pushHistory(targetUrl) {
  history.pushState(null, targetUrl, targetUrl);
}
