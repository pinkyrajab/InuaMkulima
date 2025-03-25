const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    if (err.validation) {
        return res.status(200).json({
            status: "200",
            message: err.message,
        });
    }

    return res.status(400).json({
        status: "400",
        message: err.message || "Internal server error",
    });
};

module.exports = errorHandler;
