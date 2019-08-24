module.exports = jsonify

function jsonify (rawtext, opts) {
  opts = opts || { noisey: false }
  const lines = rawtext.split('\n')
  if (lines[lines.length - 1] === '') lines.pop()

  const results = []
  const resultMap = {}
  lines.forEach(function (line) {
    const re = /\s*([A-Za-z]:)?([^:]+):([^:]+):([^:]+): (.*?)( \((.*)\))?$/.exec(line)
    if (!re) return opts.noisey ? console.error(line) : null
    if (re[1] === undefined) re[1] = ''

    const filePath = re[1] + re[2]

    let result = resultMap[filePath]
    if (!result) {
      result = resultMap[filePath] = {
        filePath: re[1] + re[2],
        messages: []
      }
      results.push(result)
    }

    result.messages.push({
      line: re[3],
      column: re[4],
      message: re[5].trim(),
      ruleId: re[7]
    })
  })

  return results
}
