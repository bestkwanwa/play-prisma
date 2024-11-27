import { PrismaClient } from '@prisma/client'
import { getStudentsByGradeAndClass } from './student';
import { createTeacher, getAllTeachers } from './teacher';
import { addTeacherToClass, getAllTeachersInClass } from './class';

const prisma = new PrismaClient(
  {
    log: [
      {
        emit: 'stdout',
        level: 'query'
      }
    ]
  }
);

async function bootstrap() {
  // const students = await getStudentsByGradeAndClass(10, 2);

  // createTeacherAndAddToClass('Alex Johnson', 'Physics', 10, 2)
  //   .then(updatedClass => console.log(updatedClass))
  //   .catch(error => console.error(error));

  getAllTeachersInClass(10, 2)
    .then(teachers => console.log(teachers))
    .catch(error => console.error(error));

}

bootstrap();
