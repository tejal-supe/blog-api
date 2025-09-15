import { body } from "express-validator";

export const validateRegisteredUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 40 })
    .isAlphanumeric()
    .withMessage(
      "FirstName should be between 2 and 40 alpha numeric characters"
    ),
  body("lastName")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 40 })
    .isAlphanumeric()
    .withMessage(
      "LastName should be between 2 and 40 alpha numeric characters"
    ),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter A Valid Email"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password should be between 8 and 12 characters and should contain alphanumeric characters,and a special character"
    ),
];

export const validateLoginData = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter A Valid Email"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password should be between 8 and 12 characters and should contain alphanumeric characters,and a special character"
    ),
];

export const validatePostData = [
  body("title").trim().notEmpty().withMessage("Enter a Title"),
  body("slug").trim().notEmpty().withMessage("Enter a slug url"),
  body("content").trim().notEmpty().withMessage("Enter Blog Content"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((categories) => {
      if (!categories) return true;

      for (let i = 0; i < categories.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(categories[i])) {
          throw new Error(`Category at index ${i} must be a valid ID`);
        }
      }

      return true;
    }),
];
