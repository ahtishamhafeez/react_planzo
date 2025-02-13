import * as Yup from "yup";
import {DURATION_UNIT} from "../constants/duration.constant";

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters")
    .required("Task name is required"),

  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),

  user_id: Yup.number()
    .positive("Invalid user ID")
    .integer("User ID must be a whole number")
    .required("User ID is required"),

  project_id: Yup.number()
    .positive("Invalid project ID")
    .integer("Project ID must be a whole number")
    .required("Project ID is required"),

  duration: Yup.object({
    unit: Yup.string()
      .oneOf(DURATION_UNIT, "Invalid unit") // Restrict to "day" or "hour"
      .required("Unit is required"),

    period: Yup.number()
      .positive("Period must be greater than 0")
      .integer("Period must be a whole number")
      .required("Period is required"),
  }).required("Duration is required"),
});

export default taskSchema;
