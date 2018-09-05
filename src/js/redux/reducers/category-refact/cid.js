function defaultCid () {
  if (defaultCid.cid) {
    return defaultCid.cid
  }
  var cidstr = location.pathname.match(/\/admin\/categories\/refact\/(\d+)/)
  var cid = cidstr ? Number(cidstr[1]) : -1
  defaultCid.cid = cid
  return cid
}

const cid = (state = defaultCid(), action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default cid
