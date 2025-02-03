import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:'skvOuXOMOdzs1V4lM7rWUtzOL1SSCFDCK2oNASvJ4pkY4nBWco6G5KpHgnS7JPxYrb5PfeIIGMJ78epWnenuZZYMX5xeTzjgSzEYBa31PP92c41ICoYlVJufw2Zacj6MDqMhyRNXdNbaBxeUB8PVHj48FXNhzALYjVxH4av34FdRVItWWSjg',
})
