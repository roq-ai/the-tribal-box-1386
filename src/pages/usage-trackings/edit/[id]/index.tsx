import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getUsageTrackingById, updateUsageTrackingById } from 'apiSdk/usage-trackings';
import { usageTrackingValidationSchema } from 'validationSchema/usage-trackings';
import { UsageTrackingInterface } from 'interfaces/usage-tracking';
import { UserInterface } from 'interfaces/user';
import { SkillInterface } from 'interfaces/skill';
import { getUsers } from 'apiSdk/users';
import { getSkills } from 'apiSdk/skills';

function UsageTrackingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<UsageTrackingInterface>(
    () => (id ? `/usage-trackings/${id}` : null),
    () => getUsageTrackingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UsageTrackingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUsageTrackingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/usage-trackings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<UsageTrackingInterface>({
    initialValues: data,
    validationSchema: usageTrackingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Usage Trackings',
              link: '/usage-trackings',
            },
            {
              label: 'Update Usage Tracking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Usage Tracking
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="usage_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Usage Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.usage_date ? new Date(formik.values?.usage_date) : null}
              onChange={(value: Date) => formik.setFieldValue('usage_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Usage Count"
            formControlProps={{
              id: 'usage_count',
              isInvalid: !!formik.errors?.usage_count,
            }}
            name="usage_count"
            error={formik.errors?.usage_count}
            value={formik.values?.usage_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('usage_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Usage Duration"
            formControlProps={{
              id: 'usage_duration',
              isInvalid: !!formik.errors?.usage_duration,
            }}
            name="usage_duration"
            error={formik.errors?.usage_duration}
            value={formik.values?.usage_duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('usage_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<SkillInterface>
            formik={formik}
            name={'skill_id'}
            label={'Select Skill'}
            placeholder={'Select Skill'}
            fetcher={getSkills}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/usage-trackings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'usage_tracking',
    operation: AccessOperationEnum.UPDATE,
  }),
)(UsageTrackingEditPage);
