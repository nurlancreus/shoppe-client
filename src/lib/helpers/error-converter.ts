/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProblemDetails {
  instance: string;
  title: string;
  status: number;
  detail: string;
  errors?: { propertyName: string; errorMessage: string }[]; // Now errors will just be an array of property names in production
  innerExceptions?: string[];
  stackTrace?: string;
  [key: string]: any; // To handle other dynamic fields like "extensions"
}

export default function convertProblemDetails(
  response: any,
  environment: "development" | "production",
): ProblemDetails {
  const problemDetails: ProblemDetails = {
    instance: response.instance ?? "",
    title: response.title ?? "An error occurred",
    status: response.status ?? 500, // Default to InternalServerError
    detail: response.detail ?? "No details provided",
  };

  // Check if it's a validation error
  const isValidationError =
    response.title === "Validation failed." && response.errors;

  if (environment === "production") {
    // General message for production
    problemDetails.detail = isValidationError
      ? "One or more validation errors occurred."
      : "An error occurred. Please contact support.";

    // In production, if validation error, show only property names in an array
    if (isValidationError) {
      problemDetails.errors = response.errors.map(
        (error: any) => error.propertyName,
      );
    }
  } else if (environment === "development") {
    // In development, show full details including error messages

    if (response.errors) {
      problemDetails.errors = response.errors.map((error: any) => ({
        propertyName: error.propertyName,
        errorMessage: error.errorMessage,
      }));
    }

    if (response.innerExceptions) {
      problemDetails.innerExceptions = response.innerExceptions;
    }

    if (response.stackTrace) {
      problemDetails.stackTrace = response.stackTrace;
    }
  }

  // Add any other additional fields from the response (works for both environments)
  for (const key in response) {
    if (
      ![
        "instance",
        "title",
        "status",
        "detail",
        "errors",
        "innerExceptions",
        "stackTrace",
      ].includes(key)
    ) {
      problemDetails[key] = response[key];
    }
  }

  return problemDetails;
}

// Example usage for development
const responseFromServer = {
  instance: "/api/products",
  title: "Validation failed.",
  status: 400,
  detail: "One or more validation errors occurred.",
  errors: [
    { propertyName: "name", errorMessage: "Name is required." },
    { propertyName: "price", errorMessage: "Price must be greater than 0." },
  ],
  innerExceptions: ["Inner exception message 1", "Inner exception message 2"],
  stackTrace: "StackTrace example for development environment",
};

// Example in Development Mode
const convertedDevObject = convertProblemDetails(
  responseFromServer,
  "development",
);
console.log("Development:", convertedDevObject);

// Example in Production Mode
const convertedProdObject = convertProblemDetails(
  responseFromServer,
  "production",
);
console.log("Production:", convertedProdObject);

export const convertValidationErrors = <T>(
  error: unknown,
  isProduction = false,
) =>
  convertProblemDetails(
    error,
    isProduction ? "production" : "development",
  ).errors?.reduce(
    (acc, value) => {
      acc[
        (value.propertyName[0].toLocaleLowerCase() +
          value.propertyName.slice(1)) as keyof T
      ] = value.errorMessage;
      return acc;
    },
    {} as Partial<Record<keyof T, string>>,
  );
