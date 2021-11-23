export function getLocalName(locale: string, name?: string, iname?: any) {
  if (iname && iname[locale]) {
    return iname[locale]
  } else if (name) {
    return name
  } else {
    return ""
  }
}

export function searchAllNames(search: string, name: string, iname: any) {
  let searched = false
  searched = name.toLowerCase().includes(search.toLowerCase())
  Object.entries(iname).forEach(entry => {
    const [key, value] = entry
    const iname: string = value as string
    if (key !== "__typename") {
      if (iname.toLowerCase().includes(search.toLowerCase())) {
        searched = true
      }
    }
  })
  return searched
}