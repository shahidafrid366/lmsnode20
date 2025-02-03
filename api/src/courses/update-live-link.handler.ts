import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";

export const updateLiveLinkHandler: RequestHandler = (req, res, next): Promise<void> => {
  return (async () => {
    try {
      const courseId = IdSchema.parse(req.params.courseId);
      const liveLink = z.string().url().parse(req.body.liveLink);

      // Update the course in the database
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          liveLink,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  })();
};
