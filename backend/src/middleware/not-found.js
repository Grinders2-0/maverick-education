const notFound = (_e, _, res, _next) => {
  res.status(404).send("Route does not exist");
};

export default notFound;
