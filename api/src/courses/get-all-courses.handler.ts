// import { RequestHandler } from "express";
// import { db } from "../common/db";

// export const getAllCoursesHandler: RequestHandler = async (req, res, next) => {
//   try {
//     const data = await db.course.findMany({
//       select: {
//         id: true,
//         title: true,
//       },
//     });
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// };


import { RequestHandler } from "express";
import { db } from "../common/db";

// Handler to fetch all courses
export const getAllCoursesHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await db.course.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
