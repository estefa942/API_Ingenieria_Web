const httpStatus = require('http-status');
const student = require('./student');

const getStudents = async (req, res) => {
  try {
    const students = await student.getStudents();

    if (students.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Not found' });
    }else if (students.length > 0){
      return res
      .status(httpStatus.OK)
      .send(students);
    }
   
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Interal server error' });
  }
};

const getStudentById = async (req, res) => {
  const {id} = req.params;
  try {
    const student = await student.getStudentById(id);

    if (!student) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Not found' });
    }else if (student){
      return res
      .status(httpStatus.OK)
      .send(student);
    }
   
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Interal server error' });
  }
};

const createStudent = async (req, res) => {
  const { body } = req;
  try {
    const newStudent = await student.createStudent(body);
    if (!newStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Cannot create Student' });
    } else if (newStudent) {
      return res
        .status(httpStatus.OK)
        .send(newStudent);
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'MongoError') {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.errmsg });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

const updateStudent = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedStudent = await student.updateStudent(id, body);
    if (!updatedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Student not updated' });
    } else if (updatedStudent) {
      return res
        .status(httpStatus.OK)
        .send(updatedStudent);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const {id} = req.params
    const deletedStudent = await student.deleteStudent(id);

    if (!deletedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Not found student' });
    }else if(deletedStudent){
      return res
      .status(httpStatus.OK)
      .send(`student with id ${deletedStudent} was deleted`);
    }
    
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Interal server error' });
  }
};

const getAverage = async (req, res) => {
  try {
    const average = await student.calculateAverage();
    return res
      .status(httpStatus.OK)
      .send({ average });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { body } = req;
  const { rule, currentNote, newNote } = body;
  try {
    const updatedStudents = await student.updateNote(rule, currentNote, newNote);
    return res
      .status(httpStatus.OK)
      .send({
        mesasage: 'students updated correctly',
        rule: rule,
        students: updatedStudents
      });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAverage,
  updateNote
};
