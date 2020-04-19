const studentModel = require ('./studentModel')

const getStudents = async () => {
  const students = await studentModel.find({}).exec();
  return students
}

const getStudentById = async (studentId) => {
  const student = await studentModel.findById({studentId}).exec();
  return student;
};

const createStudent = async (body) => {
  const studentData = { ...body };
  const student = await studentModel.create(studentData);
  return student;
}

const updateStudent = async (id, body) => {
  const newData = { ...body };
  const updatedStudent = await studentModel.findByIdAndUpdate(id, newData, { new: true }).exec();
  return updatedStudent;
}

const updateStudentByNote = async (id, newGrade) => {
  const updatedStudent = await studentModel.findOneAndUpdate(id, { note: newGrade }, { new: true }).exec();
  return updatedStudent;
}


const deleteStudent = async (id) => {
  const deletedStudent = await studentModel.findByIdAndRemove(id).exec();
  const deletedStudentId = deletedStudent['_id'];
  return deletedStudentId;
};

const calculateAverage = async () => {
  const students = await getStudents();
  if (students.length > 0) {
    const notes = students.map(s => s.note);
    const sum = notes.reduce((acc, curr) => acc + curr, 0);
    return sum / students.length;
  } else if (students.length === 0) {
    return new Error('Cannot get average without students');
  }
}

const updateNote = async (rule, currentNote, newNote) => {
  const students = await getStudents();
  if (students.length === 0) {
    throw new Error('Students not found');
  }
  let studentsToUpdate = [];
  switch (rule) {
    case 'MAX_NOTE':
      studentsToUpdate = students.filter(s => s.note <= currentNote);
      break;
    case 'MIN_NOTE':
      studentsToUpdate = students.filter(s => s.note >= currentNote);
      break
    case 'EQUAL_TO':
      studentsToUpdate = students.filter(s => s.note === currentNote);
      
      break;
  }
  if (studentsToUpdate.length === 0) {
    throw new Error('Not students to update');
  }  
  const studentsPromises = studentsToUpdate.map(s => updateStudentByNote(s.id, newNote));
  const updatedStudents = await Promise.all(studentsPromises);
  return updatedStudents;
};


module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  calculateAverage, 
  updateNote
};
