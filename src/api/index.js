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

/**
 * 获取本地文章
 * @param {int} id 文章 id
 * @param {string} type 文章类型 md||html
 */
export function getLocalArticle(id, type) {
  return request({
    url: '../assets/' + id + '.' + type,
    method: 'get'
  })
}