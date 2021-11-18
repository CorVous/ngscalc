export function getLocalName(locale: string, name?: string, iname?: any) {
  if (iname && iname[locale]) {
    return iname[locale]
  } else if (name) {
    return name
  } else {
    return ""
  }
}