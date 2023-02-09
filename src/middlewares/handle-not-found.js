const handleNotFound = (req, res) => {
    res.status(404).send({ message: "Route not found" })
}

module.exports = handleNotFound
