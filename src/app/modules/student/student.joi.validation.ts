import Joi from 'joi';

//creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'firstName is required',
      'string.max': 'firstName cannot be more than 20 characters',
      'string.pattern.base': 'First letter must be capital',
    }),
  middleName: Joi.string().trim().allow(null, ''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'lastName is required',
      'string.pattern.base': '{#value} is not valid',
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'fatherName is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'fatherOccupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'fatherContactNo is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'motherName is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'motherOccupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'motherContactNo is required',
  }),
});

// Local Guardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'contactNo is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'address is required',
  }),
});

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'id is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'string.empty': 'gender is required',
    'any.only': '{#value} is not valid',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'contactNo is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'emergencyContactNo is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not valid',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'presentAddress is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'permanentAddress is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'localGuardian is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
    .messages({
      'any.only': '{#value} is not valid',
    }),
});

export default studentValidationSchema;