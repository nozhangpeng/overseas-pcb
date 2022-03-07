import axios from 'axios'
/**
 * download
 * @param {Object} options // ajax options
 * @param {Object} aTag // html <a> tag
 * @param {String} fileName // filename
 */
export default async function (options, aTag, fileName) {
  const regex = /^(http|https)+/
  if (!regex.test(options.url)) {
    options.url = `https://${options.url}`
  }
  const response = await axios({
    ...options,
    responseType: 'blob'
  })
  const data = response.data
  const url = window.URL.createObjectURL(data)
  aTag.href = url
  aTag.download = fileName
  aTag.click()
  window.URL.revokeObjectURL(url)
}
