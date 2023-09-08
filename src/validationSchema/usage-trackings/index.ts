import * as yup from 'yup';

export const usageTrackingValidationSchema = yup.object().shape({
  usage_date: yup.date().required(),
  usage_count: yup.number().integer().nullable(),
  usage_duration: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
  skill_id: yup.string().nullable().required(),
});
