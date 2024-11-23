import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  //for creating static
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData);

  //for creating instance
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save();
  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudents,
  getSingleStudent,
};
