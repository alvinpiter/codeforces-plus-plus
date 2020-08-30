export function constructFullName(firstName, lastName) {
  let name = ""
  if (firstName !== undefined)
    name = name + firstName

  if (lastName !== undefined)
    name = name + (name.length === 0 ? "" : " ") + lastName

  return name
}
