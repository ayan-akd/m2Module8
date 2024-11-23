import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    // required: [true, 'firstName is required'],
    // maxlength: [20, 'firstName can not be more than 20 characters'],
    // trim: true,
    // validate: function (value: string) {
    //   const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //   if (firstNameStr !== value) {
    //     throw new Error('First letter must be capital');
    //     // return firstNameStr === value;
    //   }
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    // validate: {
    //   validator: (value:string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'fatherName is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'fatherOccupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'fatherContactNo is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'motherName is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'motherOccupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'motherContactNo is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'name is required'] },
  occupation: { type: String, required: [true, 'occupation is required'] },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
  address: { type: String, required: [true, 'address is required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, unique: true, required: [true, 'id is required'] },
  name: {
    type: userNameSchema,
    required: [true, 'name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email type',
    },
  },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContactNo is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'presentAddress is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanentAddress is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'localGuardian is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
});

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
//creating a custom instance 
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
