import { check, ValidationChain } from "express-validator";

export const CreatePostValidator: ValidationChain[] = [
  check("description", "Is not an string").notEmpty().isString(),
];

export const LikesValidator: ValidationChain[] = [
  check("postLikes", "Likes must be a number").notEmpty(),
];

export const CommentsValidator: ValidationChain[] = [
  check("content", "Write something").notEmpty().isString(),
  check("comments", "must have some").notEmpty(),
];

export const likeToCommentValidator: ValidationChain[] = [
  check("commentLikes", "must not be empty").notEmpty(),
];
