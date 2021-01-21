exports.success = (message, result, statusCode) => {

    return {
      success:1,
      message:message,
      error: false,
      code: statusCode,
      token:result
    };
  };
  
  exports.error = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      success:0,
      message:message,
      code: statusCode,
      error: true
    };
  };
  
  exports.validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };