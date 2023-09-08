import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  assessment_date: yup.date().required(),
  rating: yup.number().integer().nullable(),
  feedback: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  skill_id: yup.string().nullable().required(),
});
