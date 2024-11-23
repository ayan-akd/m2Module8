import { z } from 'zod';
// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'firstName cannot be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First letter must be capitalized',
    }),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'lastName must only contain alphabets',
  }),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'fatherName is required' }),
  fatherOccupation: z
    .string()
    .nonempty({ message: 'fatherOccupation is required' }),
  fatherContactNo: z
    .string()
    .nonempty({ message: 'fatherContactNo is required' }),
  motherName: z.string().nonempty({ message: 'motherName is required' }),
  motherOccupation: z
    .string()
    .nonempty({ message: 'motherOccupation is required' }),
  motherContactNo: z
    .string()
    .nonempty({ message: 'motherContactNo is required' }),
});

// Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }),
  occupation: z.string().nonempty({ message: 'occupation is required' }),
  contactNo: z.string().nonempty({ message: 'contactNo is required' }),
  address: z.string().nonempty({ message: 'address is required' }),
});

// Student schema
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'id is required' }),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'gender must be either "male" or "female"' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'email must be a valid email address' }),
  contactNo: z.string().nonempty({ message: 'contactNo is required' }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: 'emergencyContactNo is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z
    .string()
    .nonempty({ message: 'presentAddress is required' }),
  permanentAddress: z
    .string()
    .nonempty({ message: 'permanentAddress is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'inActive']).default('active'),
});

export { studentValidationSchema };
