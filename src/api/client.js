export async function get(url) {
  const options = { method: "GET" }

  let response;
  try {
    response = await fetch(url, options)
  } catch (error) {
    throw new Error("Server error")
  }

  const jsonResponse = await response.json()

  if (response.status < 200 || response.status >= 300) {
    throw new Error(jsonResponse.comment)
  }

  return jsonResponse
}
