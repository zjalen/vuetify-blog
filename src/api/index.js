import qs from 'qs';
import request from '../utils/request'

/**
 * 获取菜单信息
 */
export function getMenus() {
  return request({
    url: '/menus',
    method: 'get',
  })
}

/**
 * 获取文章列表
 * @param params
 */
export function getArticles(params) {
  console.log(qs.stringify(params));
  return request({
    url: '/articles?&' + qs.stringify(params),
    method: 'get',
  })
}