// import { RequestHandler } from "express";
// import { db } from "../common/db";

// export const getEnrolledCourses = async () => {
//   const data = await db.course.findMany({
//     where: {
//       archived: false,
//     },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       liveLink: true,
//     },
//   });

//   return data;
// };

// export const getMyCoursesHandler: RequestHandler = async (req, res, next) => {
//   try {
//     const data = await getEnrolledCourses();
//     return res.json(data);
//   } catch (error) {
//     next(error);
//   }
// };

import { RequestHandler } from "express";
import { db } from "../common/db";

// Async function that retrieves enrolled courses
export const getEnrolledCourses = async () => {
  const data = await db.course.findMany({
    where: {
      archived: false,
    },
    select: {
      id: true,
      title: true,
      description: true,
      liveLink: true,
    },
  });

  return data;
};

// Explicitly declare the return type as Promise<void>
export const getMyCoursesHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await getEnrolledCourses();
    return res.json(data); // Sends data as JSON
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};
