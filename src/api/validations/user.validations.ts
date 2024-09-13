// //validation joi
// import Joi from 'joi';

// // Định nghĩa schema Joi cho chi nhánh
// const branchSchema = Joi.object({
//   _id: Joi.string().required(),
//   name: Joi.string().required(),
//   open_hour: Joi.number().min(0).max(23).required(),
//   open_minutes: Joi.number().min(0).max(59).required(),
//   close_hour: Joi.number().min(0).max(23).required(),
//   close_minutes: Joi.number().min(0).max(59).required(),
//   createdAt: Joi.date().default(() => new Date(),),
//   updatedAt: Joi.date().default(() => new Date(),)
// });

// export { branchSchema };
