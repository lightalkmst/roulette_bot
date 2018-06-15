module.exports = {
  exec: rfs => message => (
    rfs.some (([r, f]) => {
      const match = r.exec (message.content)
      return match && (f (match) || true)
    })
  ),
}
