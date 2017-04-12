import yup from 'yup';

import citySchema from './city-schema';
import countrySchema from './country-schema';
import jobTypesSchema from './job-types-schema';
import languageSchema from './language-schema';
import roleSchema from './role-schema';
import skillSchema from './skill-schema';
import webReferenceSchema from './web-reference-schema';

export default yup.object().shape({

  id: yup.string().required(),

  active: yup.bool().required().default(false),
  active_at: yup.string(),

  career_level: yup.string().default(''),

  city: citySchema.nullable(true).default(null),

  complete: yup.bool().required().default(false),

  completed_at: yup.string(),

  completion: yup.number().default(0),

  country: countrySchema.nullable(true).default(null),

  cv_files: yup.object({
    txt: yup.string().url(),
    pdf: yup.string().url(),
    original: yup.string(),
    images: yup.array().of(yup.string().url())
  }).nullable(true).default(null),

  first_name: yup.string().required().default(''),
  last_name: yup.string().required().default(''),

  is_deleted: yup.bool().required().default(false),

  job_types: yup.array().of(jobTypesSchema).required().ensure(),

  languages: yup.array().of(languageSchema).required().ensure(),

  referral: yup.object({
    id: yup.string().required().default(''),
    name: yup.string().required().default(''),
    slug: yup.string().required().default('')
  }).nullable(true).default(null),

  relocate: yup.bool().required().default(false),

  skills: yup.array().of(skillSchema).required().ensure(),

  user: yup.string().required().default(''),

  relocations: yup.array().of(citySchema).required().ensure(),

  web_references: yup.array().of(webReferenceSchema).required().ensure(),

  roles: yup.array().of(roleSchema).required().ensure(),

  email: yup.string().email().required().default(''),

  salary: yup.object({
    min: yup.number().required().default(10000),
    max: yup.number().required().default(100000)
  }).required(),

  picture: yup.string().required().default('')

})
  .noUnknown();