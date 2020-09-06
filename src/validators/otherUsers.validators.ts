import { check, ValidationChain } from "express-validator";

export const FollowValidator: ValidationChain[] = [
  check("followers", "Must have followers").notEmpty(),
];
