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
              <Input name="store_name" label='Store Name' />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="owner_name" label='Owner Name' />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_tel" label='Store Phone Number' />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_id" label='Store Id' />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_rate" label='Store Rate' />
            </div>
            <div className="w-full p-2">
              <Input name="store_address" label='Store Address' multiline />
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
