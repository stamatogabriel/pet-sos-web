export default function getValidationErrors(err) {
  const validationErrors = {}
  console.log(err)
  err?.inner.forEach(error => {
    validationErrors[error.path] = error.message
  });

  return validationErrors
}
