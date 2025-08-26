export const validateBody = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: parsed.error.flatten() },
    });
  }
  req.validated = { ...(req.validated ?? {}), body: parsed.data };
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: parsed.error.flatten() },
    });
  }
  req.validated = { ...(req.validated ?? {}), query: parsed.data };
  next();
};
