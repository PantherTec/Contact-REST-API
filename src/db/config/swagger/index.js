import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerModelValidator from "swagger-model-validator";
import directories from "./directories";

const options = {
  swaggerDefinition: {
    info: {
      title: "Fluid-contact API documentation",
      description: "swagger documention for fluid contact"
    },
    tags: [
      {
        name: "Fluid contact",
        description: "API"
      }
    ],
    schemes: ["http"],
    host: process.env.NODE_env === "development" ? "localhost:3000" : "",
    basePath: "/"
  },
  apis: directories /* directories that we want to get our documentations from*/
};

const swaggerSpec = swaggerJSDoc(options);
swaggerModelValidator(swaggerSpec);

/*validate swagger docs */
const validateModel = (name, model) => {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    throw new Error("model doesnt match swagger contract");
  }
};
export { swaggerSpec, swaggerUI, validateModel };
