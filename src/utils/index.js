export const isInWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;

export const isInKuaizhan = window.location.href.match(/kuaizhan/);
export const isInApp = !!window.dsBridge.call("getStorage", {
  key: 'app_version'
}) || window.location.href.match('inapp=1')

export function getParamFromUrl(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  return r ? decodeURIComponent(r[2]) : '';
}

export const inviteCode = getParamFromUrl('inviteCode') || getParamFromUrl('ic');
// let env = '';


export function goDownload() {
  let url = `https://h5.zmjx.com/NASA/ttdb/index.html`;
  if (isInKuaizhan) {
    let env = getParamFromUrl('env');
    if (env === 'daily') {
      url = `https://dailyh5.zmjx.com/NASA/ttdb/index.html`;
    } else if (env === 'gray') {
      url = `https://grayh5.zmjx.com/NASA/ttdb/index.html`;
    }
  }
  const webUrl = encodeURIComponent(url)
  const downloadUrl = `/95/52/p655000935a6a7f?inviteCode=${inviteCode}&webUrl=${webUrl}`;
  // alert(downloadUrl);
  window.location.href = downloadUrl;
}

export function pushPage(url) {
  // alert(url)
  window.dsBridge.call("async.pushPage", {
    url
  });
}

export function goFreeOrder() {

  if (isInKuaizhan) {
    window.location.href = `/67/12/p659888754d32dc?inviteCode=${inviteCode}`;
  } else {
    // window.location.href = `/NASA/free-order/index.html?inviteCode=${inviteCode}`;
    const freeOrderUrl = window.location.origin + '/NASA/free-order/index.html';
    const url = `zhimajx://webPage?webUrl=${encodeURIComponent(freeOrderUrl)}`;
    pushPage(url);

  }

  // 
}