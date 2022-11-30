import { useState, useMemo, useCallback } from 'react';
import Box from '@/components/common/Box';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import { useOverlay } from '@/services/overlay';
import { actionButton } from '@/components/common/ActionButtons';

export default function Stores() {
  const [formData, setFormData] = useState({});
  const { showToast } = useOverlay();

  const actionButtons = useMemo(() => [
    actionButton({ title: 'save', type: 'primary', icon: 'done_black_24dp' }),
  ], []);

  const formAction = useCallback(() => {
    // api call
  }, []);

  const handleSuccess = useCallback(() => {
    showToast("saved successfully");
  }, []);

  return (
    <div className="bg-base-100 p-4 rounded-md">
       <Box className="overflow-hidden">
        <Form
          value={formData}
          onChange={setFormData}
          onSuccess={handleSuccess}
          action={formAction}
        >
          <div className="p-2 flex flex-wrap">
            <div className="w-full lg:w-1/3 p-2">
              <Input name="package_name" label='test' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="name" label='test2' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="slug" label='test3' />
            </div>
            <div className="w-full lg:w-2/3 p-2">
              <Input name="short_description" label='test4' />
            </div>
            <div className="w-full md:w-1/3 p-2">
              <Input name="age_limit" label='test4' formatter={(x) => Number(x)} validator={(x) => (x > -1 && x < 99) || 'Age must be a number between 0 to 99'} />
            </div>
          </div>
          <FormButtons
            className="p-4"
            buttons={actionButtons}
          />
        </Form>
      </Box>
    </div>
  );
}

Stores.routerConfig = {
  type: 'page',
  path: 'store',
};
