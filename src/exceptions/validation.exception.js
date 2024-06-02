class ValidationError extends Error {
  constructor(errors) {
    // super buat menjalankan constructor dari class Error, seperti Error("string")
    super("Validation error");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

module.exports = ValidationError;
