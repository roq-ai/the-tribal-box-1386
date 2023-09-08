import * as yup from 'yup';

export const skillValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  demand: yup.number().integer().nullable(),
  performance: yup.number().integer().nullable(),
  usage_count: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
