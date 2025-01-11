// controllers/healthCheck.controllers.js
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const healthCheck = asyncHandler(async (req, res) => {
  // Create the response using ApiResponse
  const response = new ApiResponse(200, { status: "Healthy" }, "OK");

  
  res.status(response.statusCode).json(response);
});
