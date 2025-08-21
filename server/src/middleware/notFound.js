const notFound = (req, res, next) => {
  res.status(404).json({
    error: {
      message: "Not Found",
      code: 404,
    },
  });
};

export default notFound;
