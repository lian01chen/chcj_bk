/**
 * 实现数字千分位分割
 * @param num
 * @returns {*}
 */
function formatNum(num = 0) {
  if (isNaN(num)) return num
  let numArr = num.toString().split('.')
  let float = numArr[1] || null
  let intRev = numArr[0].split('').reverse()
  let strArr = []
  for (let i = 0; i < intRev.length; i++) {
    strArr.push(intRev[i])
    if ((i + 1) % 3 == 0 && (i + 1) !== intRev.length) {
      strArr.push(',')
    }
  }
  return float ? strArr.reverse().concat(['.'],float).join('') : strArr.reverse().join('')
}
