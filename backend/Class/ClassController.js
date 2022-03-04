
exports.postSingleForm = (req, res) => {
    const inputs = req.body;
    res.send(inputs);
    console.log(inputs)
}