import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidationSchema } from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentsData } = req.body;
    //creating a schema validation using joi
    // const { error, value } = studentValidationSchema.validate(studentsData);
    //creating a schema validation using zod
    const zodParseData = studentValidationSchema.parse(studentsData);
    const result = await StudentServices.createStudentIntoDb(zodParseData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Student data is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
