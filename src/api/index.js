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
  return request({
    url: '/articles?&' + qs.stringify(params),
    method: 'get',
  })
}

/**
 * 获取文章详情
 * @param id
 */
export function getArticle(id) {
  return request({
    url: '/api/getArticle?id=' + id,
    method: 'get',
  })
}