export const test = (req, res) => {
  res.json({ message: "Hello world" })
}

export const updateUser = async (req, res, next) => {
  const { id } = req.query
  res.json()
}
