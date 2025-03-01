import { z } from "zod";
import { zodSchemaValidator } from "../../validators/schemaValidator";

export const busSchema = z.object({
  busNumber: z.string().nonempty("Bus number is required."),
  route: z.string().nonempty("Route is required.")
  .regex(/^[a-z]+(-[a-z]+)*$/, "Route must be in the format location-location-location."),
  capacity: z.number().int().positive("Capacity must be a positive integer."),
  driverId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid driver ID format").optional(),
});

export const busValidator = zodSchemaValidator(busSchema);