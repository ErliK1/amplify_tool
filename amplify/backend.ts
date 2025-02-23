import { functionFromHere } from './functions/function-from-here/resource.ts'
import { testFunctionTest1 } from './functions/test-function-test1/resource.ts'
import { defineBackend } from '@aws-amplify/backend';

import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  functionFromHere,
  testFunctionTest1,
  auth,
  data,
  storage,
});

